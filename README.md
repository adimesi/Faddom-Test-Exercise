
## Getting Started

1. configure the .env file of the backend with:
    AWS_ACCESS_KEY_ID
    AWS_SECRET_ACCESS_KEY
    AWS_REGION

2. run the  backend side:
    cd ./backend
    npm install
    node server.js

3. run the frontend side:
    cd ./frontend
    npm install
    npm run dev

4. Open a browser and navigate to 'http://localhost:3001'



## Sources  and commands :

# chart.js
https://www.chartjs.org/

# aws how to get cpu usage via api
https://stackoverflow.com/questions/71631119/how-to-get-aws-vcpus-utilization-number-via-api

# how aws cloudwatch works
https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/US_SingleMetricPerInstance.html

# how to query cloudwatch metrics via native api
https://aws.amazon.com/developer/tools/

# nodejs aws sdk
https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html#describeInstances-property

# configure awscli
aws configure

# get all instances
aws ec2 describe-instances

# get data from cloudwatch api
aws cloudwatch get-metric-statistics \
--metric-name CPUUtilization \
--start-time 2014-04-08T23:18:00Z \
--end-time 2014-04-09T23:18:00Z \
--period 3600 \
--namespace AWS/EC2 \
--statistics Average \
--dimensions Name=InstanceId,Value=i-abcdef

