import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeather, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import notificationsData from '../data/notifications.json'; // Import notifications

const NavigationBar = () => {
    const location = useLocation();
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkTheme(savedTheme === 'dark');
            document.body.classList.toggle('dark-theme', savedTheme === 'dark');
        }
        // Load notifications from JSON
        setNotifications(notificationsData.notifications);
        setUnreadCount(notificationsData.notifications.length); // Set initial unread count
    }, []);

    const toggleTheme = () => {
        setIsDarkTheme(prevTheme => {
            const newTheme = !prevTheme;
            document.body.classList.toggle('dark-theme', newTheme);
            localStorage.setItem('theme', newTheme ? 'dark' : 'light');
            return newTheme;
        });
    };

    const toggleNotifications = () => {
        setShowNotifications(prevShow => !prevShow);
        if (!showNotifications) {
            setUnreadCount(0); // Mark all as read when opening the list
        }
    };

    const markAsRead = () => {
        setUnreadCount(0); // Clear the unread count
        setShowNotifications(false); // Optionally close the notifications list
    };

    const openExternalLink = (url) => {
        window.open(url, '_blank'); // Open the URL in a new tab
    };

    return (
        <Navbar expand="lg" className="navbar-light bg-white py-3">
            <div className="container">
                <Navbar.Brand as="div" className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faFeather} className="text-primary me-2" />
                    AI WebCrawler
                </Navbar.Brand>
                <Nav className="mx-auto">
                    <button onClick={() => openExternalLink('/svc/redisinsights')} className="btn btn-link px-3">Redisinsights</button>
                    <button onClick={() => openExternalLink('/svc/kibana')} className="btn btn-link px-3">Kibana</button>
                </Nav>
                <div className="d-flex align-items-center position-relative">
                    <div className="theme-toggle-wrapper me-4">
                        <input
                            type="checkbox"
                            id="theme-toggle"
                            className="theme-toggle"
                            checked={isDarkTheme}
                            onChange={toggleTheme}
                        />
                        <label htmlFor="theme-toggle" className="theme-toggle-label"></label>
                    </div>
                    <div onClick={toggleNotifications} className="cursor-pointer notification-icon position-relative">
                        <FontAwesomeIcon icon={faBell} className="me-4" />
                        {unreadCount > 0 && (
                            <span className="notification-count position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
                                {unreadCount}
                            </span>
                        )}
                    </div>
                    {showNotifications && (
                        <div className="notifications-list position-absolute bg-white shadow p-3" style={{ right: 0, top: '100%', zIndex: 1050 }}>
                            <button onClick={markAsRead} className="btn btn-link mark-as-read">Mark all as read</button>
                            {notifications.length > 0 ? (
                                notifications.map(notification => (
                                    <div key={notification.id} className="notification-item">
                                        {notification.message}
                                    </div>
                                ))
                            ) : (
                                <div className="notification-item">No notifications</div>
                            )}
                        </div>
                    )}
                    <span className="me-2">Vishal Vijayakumar</span>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                </div>
            </div>
        </Navbar>
    );
};

export default NavigationBar;