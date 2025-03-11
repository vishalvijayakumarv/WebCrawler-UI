import React, { useEffect, useRef, useState } from 'react';
import { API_ENDPOINTS } from '../utils/api';

const LiveLogs = ({ stream, onBackClick }) => {
    const [logs, setLogs] = useState([]);
    const logsEndRef = useRef(null);
    const eventSourceRef = useRef(null);

    useEffect(() => {
        const startLogStream = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.STREAM_LOGS, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ log_stream_name: stream }),
                });

                if (!response.ok) throw new Error('Failed to start log stream');

                eventSourceRef.current = new EventSource(`${API_ENDPOINTS.STREAM_LOGS}?log_stream_name=${stream}`);

                eventSourceRef.current.onmessage = (event) => {
                    setLogs((prevLogs) => {
                        const newLogs = [event.data, ...prevLogs];
                        return newLogs.length > 20 ? newLogs.slice(0, 20) : newLogs;
                    });
                };

                eventSourceRef.current.onerror = () => {
                    console.error('Error streaming logs');
                    eventSourceRef.current.close();
                };
            } catch (err) {
                console.error('Error starting log stream:', err);
            }
        };

        startLogStream();

        return () => {
            if (eventSourceRef.current) eventSourceRef.current.close();
        };
    }, [stream]);

    useEffect(() => {
        logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    return (
        <div className="logs-container">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Live Logs: {stream}</h2>
                <button
                    onClick={() => {
                        console.log("Back button clicked");
                        onBackClick();
                    }}
                    className="view-logs-button"
                >
                    Back
                </button>
            </div>
    
            {/* Scrollable Log Box */}
            <div className="logs-box overflow-y-auto bg-black text-green-400 p-3 rounded-lg border border-gray-700">
                {logs.length === 0 ? (
                    <p className="text-gray-400">Waiting for logs...</p>
                ) : (
                    logs.map((log, index) => (
                        <div key={index} className="log-entry">
                            {log}
                        </div>
                    ))
                )}
                <div ref={logsEndRef}></div>
            </div>
        </div>
    );
};

export default LiveLogs;
