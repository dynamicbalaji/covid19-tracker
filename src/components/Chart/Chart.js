import React from 'react';
import { Line } from 'react-chartjs-2';

import './Chart.css';

const Chart = ({ graphData, value, index }) => {
    
    if(value !== index) return null;

    let dataset = [{
        data: graphData.map(({ confirmed }) => confirmed),
        label: 'Confirmed',
        borderColor: '#3333ff',
        fill: true
    }];

    let title = `Daily Confirmed Cases Timeline`;

    if (index === 1) {
        dataset = [{
            data: graphData.map(({ confirmed }) => confirmed),
            label: 'Confirmed',
            borderColor: 'rgba(0, 0, 255, 0.5)',
            fill: true
        }, {
            data: graphData.map(({ recovered }) => recovered),
            label: 'Recovered',
            borderColor: 'rgba(0, 255, 0, 0.5)',
            fill: true
        }, {
            data: graphData.map(({ deaths }) => deaths),
            label: 'Deceased',
            borderColor: 'rgba(255, 0, 0, 0.5)',
            fill: true
        }];
        title = `Daily Cases Timeline`;
    } else if (index === 2) {
        dataset = 'Country';
        title = '';
    }

    const lineChart = (
        graphData[0] ?
            <Line data={{
                labels: graphData.map(({ date }) => date),
                datasets: dataset
            }} 
            options={{
                title: { display: true, text: title }
            }}/> : null
    );

    return (
        <div className="chart-container">
            {lineChart}
        </div>
    );
}

export default Chart;