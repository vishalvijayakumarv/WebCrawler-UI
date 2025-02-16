import React, { useState } from 'react';
import '../styles/SendScraper.css';

const SendScraper = () => {
    const [amount, setAmount] = useState('Job-Name');
    const [recipient, setRecipient] = useState('http://www/example.com');

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleRecipientChange = (e) => {
        setRecipient(e.target.value);
    };

    const handleSendMoney = () => {
        // Logic to send money goes here
        alert(`Sending ${amount} to ${recipient}`);
    };

    return (
        <div className="SendScraperWrapper">
            <h5 className="header">Send To Scraper</h5>
            <div className="formGroup">
                <input
                    type="text"
                    className="inputField"
                    placeholder="Amount"
                    value={amount}
                    onChange={handleAmountChange}
                />
                <input
                    type="text"
                    className="inputField"
                    placeholder="Recipient account number"
                    value={recipient}
                    onChange={handleRecipientChange}
                />
            </div>
            <div className="actionRow">
                <button className="sendButton" onClick={handleSendMoney}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default SendScraper;