import React, { useState } from 'react';
import '../styles/SendScraper.css';

const SendScraper = () => {
    const [Job, setJob] = useState('');
    const [recipient, setRecipient] = useState('');

    const handleJobChange = (e) => {
        setJob(e.target.value);
    };

    const handleRecipientChange = (e) => {
        setRecipient(e.target.value);
    };

    const handleSendurl = () => {
        // Logic to send url goes here
        alert(`Sending ${Job} to ${recipient}`);
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