import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faConciergeBell, faCog } from '@fortawesome/free-solid-svg-icons';
import '../styles/Sidebar.css';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    useEffect(() => {
        const appContainer = document.querySelector('.app-container');
        appContainer.classList.toggle('sidebar-collapsed', isCollapsed);
    }, [isCollapsed]);

    return (
        <div 
            className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}
            onMouseEnter={() => setIsCollapsed(false)}
            onMouseLeave={() => setIsCollapsed(true)}
            style={{
                width: isCollapsed ? '70px' : '200px',
                transition: 'width 0.3s ease',
            }}
        >
            <ul>
                <li>
                    <Link to="/">
                        <FontAwesomeIcon icon={faHome} size={isCollapsed ? 16 : 20} />
                        <span style={{ display: isCollapsed ? 'none' : 'inline' }}>Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/services">
                        <FontAwesomeIcon icon={faConciergeBell} size={isCollapsed ? 16 : 20} />
                        <span style={{ display: isCollapsed ? 'none' : 'inline' }}>Services</span>
                    </Link>
                </li>
            </ul>
            <div className="sidebar-footer">
                <Link to="/settings" className="nav-item" title="Settings">
                    <FontAwesomeIcon icon={faCog} size={isCollapsed ? 16 : 20} />
                    <span style={{ display: isCollapsed ? 'none' : 'inline' }}>Settings</span>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar; 