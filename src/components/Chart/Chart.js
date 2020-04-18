import React from 'react';
import { Line } from 'react-chartjs-2';

import './Chart.css';

const Chart = ({ graphData, value, index }) => {
    
    if(value !== index) return null;

    const lineChart = (
        graphData[0] ?
            <Line data={{
                labels: graphData.map(({ date }) => date),
                datasets: [{
                    data: graphData.map(({ confirmed }) => confirmed),
                    label: 'Confirmed',
                    borderColor: '#3333ff',
                    fill: true
                }]
            }} 
            options={{
                title: { display: true, text: `Confirmed Cases Timeline` }
            }}/> : null
    );

    return (
        <div className="chart-container">
            {lineChart}
        </div>
    );
}

export default Chart;