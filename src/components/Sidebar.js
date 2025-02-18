import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faConciergeBell } from '@fortawesome/free-solid-svg-icons';
import '../styles/Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul className="sidebar-list">
                <li className="sidebar-item">
                    <Link to="/services" className="sidebar-link">
                        <FontAwesomeIcon icon={faConciergeBell} className="sidebar-icon" />
                        <span className="sidebar-text">Services</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/settings" className="sidebar-link">
                        <FontAwesomeIcon icon={faCog} className="sidebar-icon" />
                        <span className="sidebar-text">Settings</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar; 