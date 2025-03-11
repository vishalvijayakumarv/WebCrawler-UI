import React, { useState } from 'react';
import LogStreams from '../components/LogStreams';
import LiveLogs from '../components/LiveLogs';

const Services = () => {
    const [selectedStream, setSelectedStream] = useState(null);

    const handleStreamSelect = (stream) => {
        setSelectedStream(stream);
    };

    const handleBackClick = () => {
        setSelectedStream(null);
    };

    return (
        <div className="services-page">
            <h1 className="text-2xl font-semibold mb-4">Services</h1>
            <p className="mb-4 text-gray-700">Here are our services and log streams.</p>
    
            <div className="services-container">
                <div className="log-streams-section">
                    <h2 className="text-lg font-semibold mb-2">Available Log Streams</h2>
                    <LogStreams onSelectStream={handleStreamSelect} />
                </div>
    
                <div className="live-logs-section">
                    {selectedStream ? (
                        <>
                            {/* <h2 className="text-lg font-semibold mb-2">Live Logs</h2> */}
                            <LiveLogs stream={selectedStream} onBackClick={handleBackClick} />
                        </>
                    ) : (
                        <div className="empty-logs-message">
                            <p className="text-gray-400">Select a log stream to view live logs.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Services;
