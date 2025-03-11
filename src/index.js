import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import './styles/ContainersList.css';
import './styles/App.css';
import './styles/Navbar.css';
import './styles/SendScraper.css';
import './styles/ServiceCard.css';
import './styles/WorkersChart.css';
import './styles/LogStreams.css';
import './styles/LiveLogs.css';
import './styles/Services.css'; // Add this line

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);