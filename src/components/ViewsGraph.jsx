'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { useEffect, useRef } from 'react';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ViewsGraph = ({ videos }) => {
    const chartRef = useRef(null);

    const data = {
        labels: videos.map((video) => video.title),
        datasets: [
            {
                label: 'Views',
                data: videos.map((video) => video.viewCount),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => value.toLocaleString(),
                },
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => `Views: ${context.parsed.y.toLocaleString()}`,
                },
            },
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="graph-container">
            <h2>Views per Video</h2>
            <Bar data={data} options={options} ref={chartRef} />
            <style jsx>{`
        .graph-container {
          padding: 20px;
          flex-grow: 1;
        }
        h2 {
          text-align: center;
        }
        .graph-container > div {
          height: 70vh;
        }
      `}</style>
        </div>
    );
};

export default ViewsGraph;
