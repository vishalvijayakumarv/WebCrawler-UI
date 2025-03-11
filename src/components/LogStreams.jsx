import React, { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../utils/api';

const LogStreams = ({ onSelectStream }) => {
    const [streams, setStreams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStreams = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.LIST_LOG_STREAMS);
                if (!response.ok) {
                    throw new Error('Failed to fetch log streams');
                }
                const data = await response.json();
                setStreams(data.log_streams || []);
            } catch (error) {
                console.error('Error fetching log streams:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStreams();
    }, []);

    if (loading) return <p className="text-gray-500">Loading log streams...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="bg-white shadow-md rounded-lg p-4 border border-blue-500">
            <h2 className="text-lg font-semibold mb-2">Available Log Streams</h2>
            <table className="border-collapse border border-blue-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2 text-left">Log Stream Name</th>
                        <th className="border p-2 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {streams.length === 0 ? (
                        <tr>
                            <td colSpan="2" className="text-center p-4 text-blue-500">
                                No log streams available
                            </td>
                        </tr>
                    ) : (
                        streams.map((stream) => (
                            <tr key={stream} className="border">
                                <td className="p-2">{stream}</td>
                                <td className="p-2 text-center">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                                        onClick={() => {
                                            console.log("Selected Stream:", stream);
                                            onSelectStream(stream);
                                        }}
                                    >
                                        View Logs
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
    
    
};

export default LogStreams;
