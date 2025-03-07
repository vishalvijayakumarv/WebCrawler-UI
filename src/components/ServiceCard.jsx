import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/ServiceCard.css';
import { API_ENDPOINTS } from "../utils/api";
const ServiceCard = () => {
    const [services, setServices] = useState([]);
    const [gradients, setGradients] = useState([]);
    const [cardOrder, setCardOrder] = useState([]);
    const containerRef = useRef(null);
    const wheelThrottleRef = useRef(false); // added throttle ref

    const fetchServices = async () => {
        try {
            // const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/list-services`);
            const response = await fetch(API_ENDPOINTS.LIST_SERVICES);
            if (!response.ok) {
                throw new Error('Failed to fetch services');
            }
            const data = await response.json();
            setServices(data.services || []); // Ensure services is an array
        } catch (error) {
            console.error(error);
            setServices([]); // Set services to an empty array on error
        }
    };

    useEffect(() => {
        fetchServices(); // Fetch services on component mount

        const intervalId = setInterval(fetchServices, 300000); // Fetch data every 5 minutes (300000 ms)

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    useEffect(() => {
        const generateGradients = () => {
            const colors = [
                ['#0f0c29', '#302b63'], // Deep Blue to Purple
                ['#1e3c72', '#2a5298'], // Navy Blue to Steel Blue
                ['#3a1c71', '#d76d77'], // Dark Purple to Pink
                ['#000428', '#004e92'], // Midnight Blue to Deep Sky Blue
                ['#1a2a6c', '#b21f1f'], // Deep Indigo to Dark Red
                ['#232526', '#414345'], // Obsidian Black to Dark Gold
                ['#141E30', '#243B55'], // Charcoal Grey to Electric Blue
                ['#200122', '#6f0000'], // Deep Violet to Blood Red
                ['#000000', '#0f9b0f'], // Black Pearl to Neon Blue
                ['#00203F', '#00A99D'], // Dark Sapphire to Emerald Green
                ['#232526', '#ff7300'], // Shadow Black to Fire Orange
                ['#1F1C2C', '#928DAB'], // Gunmetal Grey to Electric Purple
                ['#2C3E50', '#FD746C'], // Twilight Blue to Magenta
                ['#434343', '#1c92d2']  // Graphite Black to Royal Blue
            ];
            const count = services.length;
            let gradients;
            if (count <= colors.length) {
                // Shuffle colors array uniquely
                const shuffledColors = [...colors].sort(() => Math.random() - 0.5);
                gradients = services.map((_, index) => {
                    const c = shuffledColors[index];
                    return `linear-gradient(135deg, ${c[0]}, ${c[1]})`;
                });
            } else {
                // Fallback if more services than colors
                gradients = services.map(() => {
                    const randomIndex = Math.floor(Math.random() * colors.length);
                    const c = colors[randomIndex];
                    return `linear-gradient(135deg, ${c[0]}, ${c[1]})`;
                });
            }
            setGradients(gradients);
        };

        generateGradients();
    }, [services]);

    // Initialize card order once services are loaded
    useEffect(() => {
        if (services.length > 0) setCardOrder(services.map((_, index) => index));
    }, [services]);

    // Returns style based on card's position in the order
    const getStyleForPosition = (position) => {
        if (position === 0) {
            return { transform: '', zIndex: 100, opacity: 1 };
        }
        // Adjust the offset values here to move the cards slightly
        const offset = -25 * position; // change -30 to another value for different spacing
        const scale = Math.max(1 - position * 0.1, 0.7);
        const opacity = Math.max(1 - position * 0.2, 0.3);
        return {
            transform: `translate(${offset}px, ${offset}px) scale(${scale})`,
            zIndex: 70 - position * 20,
            opacity,
        };
    };

    const handleWheel = (e) => {
        e.preventDefault();
        if (wheelThrottleRef.current) return; // throttle check
        wheelThrottleRef.current = true;

        setCardOrder(prevOrder => {
            const newOrder = [...prevOrder];
            if (e.deltaY > 0) {
                // Scroll down
                const first = newOrder.shift();
                newOrder.push(first);
            } else {
                // Scroll up
                const last = newOrder.pop();
                newOrder.unshift(last);
            }
            return newOrder;
        });

        setTimeout(() => {
            wheelThrottleRef.current = false;
        }, 100); // adjust delay as needed
    };

    return (
        <div className="servicesWrapper">
            <div className="servicesHeader">
                <h2>Services ({services.length})</h2>
                {/* <button className="addServiceButton">Refresh</button> */}
            </div>
            <div 
                className="serviceCardsContainer"
                ref={containerRef}
                onWheel={handleWheel}
                style={{ position: 'relative', height: '250px' }}
            >
                {cardOrder.map((serviceIndex, orderPos) => {
                    const service = services[serviceIndex];
                    const styleRest = getStyleForPosition(orderPos);
                    return (
                        <motion.div
                            key={serviceIndex}
                            className="serviceCard"
                            style={{
                                background: gradients[serviceIndex],
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: `translate(-50%, -50%) ${styleRest.transform}`,
                                zIndex: styleRest.zIndex,
                                opacity: styleRest.opacity,
                                backgroundColor: 'var(--bg-color)',
                                color: 'var(--text-color)',
                            }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                            <div className="card-content">
                                <h4 className="text">{service.name}</h4>
                                <p>Status: {service.status}</p>
                                <p>Version: {service.version}</p>
                                <p>Uptime: {service.uptime}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default ServiceCard;
