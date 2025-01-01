
'use client'

import { useState } from 'react';
import axios from 'axios';
require('dotenv').config();

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/api/cpu-usage';
export default function Form({ onDataFetch }) {
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const formData = new FormData(e.target);
    try {
      const response = await axios({
        method: 'POST',
        url: NEXT_PUBLIC_BACKEND_URL,
        data: {
          ipAddress: formData.get('ipAddress'),
          timePeriod: parseInt(formData.get('timePeriod')),
          interval: parseInt(formData.get('interval'))
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data) {
        onDataFetch(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch data');
      console.error('Error details:', err.response?.data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} c>
        <div >
          
          <div>
            <label >Time Period </label>
            <input 
              name="timePeriod"
              type="number"
            ></input>
          </div>
          <div>
            <label>Period</label>
            <input
                name="interval"
                type="number"
            ></input>
          </div>
        </div>
        <div>
            <label >IP Address</label>
            <input 
              name="ipAddress" 
              type="text"
            />
          </div>
        <button type="submit">Load Data</button>
      </form>
      {error && (
        <div >
          {error}
        </div>
      )}
    </div>
  );
}