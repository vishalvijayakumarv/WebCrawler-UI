import React, { useState, useRef, useEffect } from 'react';
import '../styles/ContainersList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDocker } from '@fortawesome/free-brands-svg-icons';
import containersData from '../data/containers.json';

const ContainersList = () => {
    const containers = containersData.containers;
    const [activeTab, setActiveTab] = useState('all');
    const [visibleContainers, setVisibleContainers] = useState(4);
    const [searchTerm, setSearchTerm] = useState('');
    const observerRef = useRef();

    const filteredContainers = containers.filter(container => {
        if (activeTab !== 'all' && container.status.toLowerCase() !== activeTab) {
            return false;
        }
        if (searchTerm && !container.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }
        return true;
    });

    const lastContainerRef = useRef();

    useEffect(() => {
        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setVisibleContainers(prevVisibleContainers => prevVisibleContainers + 4);
            }
        });
    }, []);

    useEffect(() => {
        if (lastContainerRef.current) {
            observerRef.current.observe(lastContainerRef.current);
        }
        return () => {
            if (lastContainerRef.current) {
                observerRef.current.unobserve(lastContainerRef.current);
            }
        };
    }, [lastContainerRef.current]);

    const getTabLabel = () => {
        switch (activeTab) {
            case 'running':
                return `Running (${filteredContainers.length})`;
            case 'completed':
                return `Completed (${filteredContainers.length})`;
            default:
                return `All containers (${filteredContainers.length})`;
        }
    };

    return (
        <div className="rounded-3 p-4 mb-4 containersWrapper">
            <div className="d-flex justify-content-between align-items-center mb-4 containersHeader">
                <h5 className="mb-0">{getTabLabel()}</h5>
                <div>
                    <input
                        type="text"
                        className="ContainerListInputField"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <ul className="nav nav-pills mb-4">
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === 'all' ? 'active' : ''}`} href="#" onClick={() => setActiveTab('all')}>All containers</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === 'running' ? 'active' : ''}`} href="#" onClick={() => setActiveTab('running')}>Running</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === 'completed' ? 'active' : ''}`} href="#" onClick={() => setActiveTab('completed')}>Completed</a>
                </li>
            </ul>

            <div className="container-list">
                {filteredContainers.slice(0, visibleContainers).map((container, index) => (
                    <div
                        key={container.id}
                        className="transaction-item d-flex align-items-center justify-content-between"
                        ref={index === visibleContainers - 1 ? lastContainerRef : null}
                    >
                        <div className="d-flex align-items-center">
                            <div className="transaction-icon me-3">
                                <FontAwesomeIcon icon={faDocker} size="2x" />
                            </div>
                            <div>
                                <div>{container.name}</div>
                                <div className="container-details">
                                    <small className="text-muted">Status: {container.status}</small>
                                    <small className="text-muted">Uptime: {container.uptime}</small>
                                </div>
                            </div>
                        </div>
                        <div className="text-end">
                            <div className="transaction-amount positive">CPU: {container.cpu_usage}</div>
                            <div className="transaction-amount positive">Memory: {container.mem_usage}</div>
                            <small className="text-muted">Image: {container.image}</small>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContainersList;