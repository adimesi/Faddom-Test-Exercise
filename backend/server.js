const express = require('express');
const app = express();
const cors = require('cors');
const AWS = require('aws-sdk');
require('dotenv').config();

app.use(cors());
app.use(express.json());
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const cloudwatch = new AWS.CloudWatch();
const ec2= new AWS.EC2();

app.post('/api/cpu-usage', async (req, res) => {

    const{ipAddress, timePeriod, interval} = req.body;
    if(!ipAddress || !timePeriod || !interval){
        return res.status(400).json({message: 'Missing required fields'});
    }
    
    const dataPromise = await new Promise((resolve, reject) => {
        ec2.describeInstances({}, function(err, d) {
            if (err) {
                reject(err);
            } else {
                resolve(d.Reservations);
            }
        });
    });

    function getInstances(dataPromise){
        for (const reservation of dataPromise) {
            for (const instance of reservation.Instances) {
                const instanceId = instance.InstanceId;
                const instanceIpAddress = instance.PrivateIpAddress;
                if (ipAddress == instanceIpAddress){
                    return instanceId;
                }
            }
        }
        return 'No instance found';
    }

    const instanceIdOFIp = getInstances(dataPromise);
     const params={
        MetricName: 'CPUUtilization',
        Namespace: 'AWS/EC2',
        Dimensions: [
            {
                Name: 'InstanceId',
                Value: instanceIdOFIp
            }
        ],
        StartTime: new Date(new Date().getTime() - timePeriod * 60000).toISOString(),
        EndTime: new Date().toISOString(),
        Period: parseInt(interval),
        Statistics: ['Average'], 
        Unit: 'Percent'
    };
    
    cloudwatch.getMetricStatistics(params, function(err, data) {
        if (err) {
            res.status(500).json({ message: 'Error fetching data' });
        } else {
            res.json(data.Datapoints);
        }
    });
    
    
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

