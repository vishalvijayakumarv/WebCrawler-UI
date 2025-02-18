import React, { useEffect, useRef } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import containersData from '../data/containers.json';
import '../styles/WorkersChart.css';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const WorkersChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const containers = containersData.containers;

  const runningCount = containers.filter(container => container.status === 'Running').length;
  const completedCount = containers.filter(container => container.status === 'Completed').length;
  const exitedCount = containers.filter(container => container.status === 'Exited').length;

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Running', 'Completed', 'Exited'],
        datasets: [
          {
            data: [runningCount, completedCount, exitedCount],
            backgroundColor: ['#36A2EB', '#2ecc71', '#e74c3c'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [runningCount, completedCount, exitedCount]);

  return (
    <div className="workers-chart">
      <h5 className="worker-chart-title">Worker Containers</h5>
      <div className="worker-chart-container">
        <canvas id="donutChart" ref={chartRef} className="worker-chart-canvas"></canvas>
      </div>
      <div className="worker-chart-legend">
        <div className="legend-item">
          {/* <div className="legend-color" style={{ backgroundColor: '#36A2EB' }}></div> */}
          {/* Running */}
        </div>
        <div className="legend-item">
          {/* <div className="legend-color" style={{ backgroundColor: '#2ecc71' }}></div> */}
          {/* Completed */}
        </div>
        <div className="legend-item">
          {/* <div className="legend-color" style={{ backgroundColor: '#e74c3c' }}></div> */}
          {/* Exited */}
        </div>
      </div>
    </div>
  );
};

export default WorkersChart;