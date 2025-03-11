import React, { useEffect, useRef, useState } from 'react';
import { API_ENDPOINTS } from '../utils/api';

const LiveLogs = ({ stream, onBackClick }) => {
    const [logs, setLogs] = useState([]);
    const [allLogs, setAllLogs] = useState([]); // Stores all logs for scrolling
    const logsContainerRef = useRef(null);
    const eventSourceRef = useRef(null);
    const [isUserScrolling, setIsUserScrolling] = useState(false);

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
                    setAllLogs((prevLogs) => [...prevLogs, event.data]); // Keep all logs
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

    // Handle scrolling behavior
    useEffect(() => {
        if (!logsContainerRef.current) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = logsContainerRef.current;
            setIsUserScrolling(scrollTop + clientHeight < scrollHeight - 10); // Check if user scrolled up
        };

        logsContainerRef.current.addEventListener('scroll', handleScroll);
        return () => logsContainerRef.current?.removeEventListener('scroll', handleScroll);
    }, []);

    // Update displayed logs (limit to latest 20)
    useEffect(() => {
        setLogs(allLogs.slice(-20)); // Always show last 20 logs

        if (!isUserScrolling) {
            logsContainerRef.current?.scrollTo({ top: logsContainerRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [allLogs]);

    return (
        <div className="logs-container">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Live Logs: {stream}</h2>
                <button onClick={onBackClick} className="view-logs-button">Back</button>
            </div>

            {/* Scrollable Log Box */}
            <div ref={logsContainerRef} className="logs-box p-3 rounded-lg border">
                {logs.length === 0 ? (
                    <p className="text-gray-400">Waiting for logs...</p>
                ) : (
                    logs.map((log, index) => (
                        <div key={index} className="log-entry">{log}</div>
                    ))
                )}
            </div>
        </div>
    );
};

export default LiveLogs;
