'use client'

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default function Chart({ data }) {

  if (!data || !data.length) return null;
  const chartData = {
    labels: data.map((dot) => new Date(dot.Timestamp).toLocaleTimeString('en-US', {
        hour: '2-digit',
        hour12: true,
    })),
    datasets: [
      {
        label: 'CPU Usage',
        data: data.map((dot) => dot.Average),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgb(211, 228, 228)',
        tension: 0.7,
      }
    ]
  };

  const options = {
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: 'Percentage',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Time',
                },
              },
            },
          };

  return (
    <div >
      <Line data={chartData} options={options} />
    </div>
  );
}
