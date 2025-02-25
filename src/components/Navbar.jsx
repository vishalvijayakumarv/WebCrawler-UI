import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeather, faBell, faSignOutAlt, faHome, faConciergeBell, faCog, faSquarePollVertical,faSitemap} from '@fortawesome/free-solid-svg-icons';
import { faServicestack } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../utils/api';

const NavigationBar = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchNotifications = async () => {
        try {
            // const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/notification`);
            const response = await fetch(API_ENDPOINTS.NOTIFICATION);
            if (!response.ok) {
                throw new Error('Failed to fetch notifications');
            }
            const data = await response.json();
            setNotifications(data.notifications || []); // Ensure notifications is an array
            setUnreadCount(data.notifications.length); // Set initial unread count
        } catch (error) {
            console.error('Error fetching notifications:', error);
            setNotifications([]); // Set notifications to an empty array on error
        }
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkTheme(savedTheme === 'dark');
            document.body.classList.toggle('dark-theme', savedTheme === 'dark');
        }
        fetchNotifications(); // Fetch notifications on component mount
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
                    WebCrawler
                </Navbar.Brand>
                <Nav className="mx-auto">
                    <Link to="/" className="nav-link">
                        <FontAwesomeIcon icon={faHome} className="me-2" />
                        Home
                    </Link>
                    <Link to="/services" className="nav-link">
                        <FontAwesomeIcon icon={faSitemap} className="me-2" />
                        Serivces
                    </Link>
                    <Link to="/reports" className="nav-link">
                        <FontAwesomeIcon icon={faSquarePollVertical} className="me-2" />
                        Reports
                    </Link>
                    <Link to="/settings" className="nav-link">
                        <FontAwesomeIcon icon={faCog} className="me-2" />
                        Settings
                    </Link>
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
                        <div className="notifications-list position-absolute shadow p-3" style={{ right: 0, top: '100%', zIndex: 1050 }}>
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