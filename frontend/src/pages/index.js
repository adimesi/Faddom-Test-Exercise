'use client'

import { useState } from 'react';
import Form from '../components/Form';
import Chart from '../components/Chart';

export default function Home() {
  const [metricsData, setMetricsData] = useState([]);

  const handleDataFetch = (data) => {
    
    setMetricsData(data);
  };

  return (
    <main >
      <div>
        <h1 >AWS Instance CPU usage</h1>
        <Form onDataFetch={handleDataFetch} />
        <Chart data={metricsData} />
      </div>
    </main>
  );
}