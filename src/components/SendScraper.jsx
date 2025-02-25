import React, { useState } from 'react';
import '../styles/SendScraper.css';
import { API_ENDPOINTS } from '../utils/api';

const SendScraper = () => {
    const [Job, setJob] = useState('');
    const [recipient, setRecipient] = useState('');

    const handleJobChange = (e) => {
        setJob(e.target.value);
    };

    const handleRecipientChange = (e) => {
        setRecipient(e.target.value);
    };

    const handleSendurl = async () => {
        if (!Job && !recipient) {
            alert('Job name & Website URL required');
            return;
        } else if (!Job) {
            alert('Job name required');
            return;
        } else if (!recipient) {
            alert('Website URL required');
            return;
        }

        const requestBody = {
            url: recipient,
            job_name: Job
        };

        try {
            const response = await fetch(API_ENDPOINTS.SEND_SCRAPER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('Failed to send data to the scraper');
            }

            const data = await response.json();
            alert(`Success: ${data.message}`);
        } catch (error) {
            console.error('Error:', error);
            alert('Error sending data to the scraper');
        }
    };

    return (
        <div className="SendScraperWrapper" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <h5 className="header">Send To Scraper</h5>
            <div className="formGroup">
                <input
                    type="text"
                    className="SendScraperInputField"
                    placeholder="JobName"
                    value={Job}
                    onChange={handleJobChange}
                />
                <input
                    type="text"
                    className="SendScraperInputField"
                    placeholder="Website URL"
                    value={recipient}
                    onChange={handleRecipientChange}
                />
            </div>
            <div className="actionRow">
                <button className="sendButton" onClick={handleSendurl}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default SendScraper;