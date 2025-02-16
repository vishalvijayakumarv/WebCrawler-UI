import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ContainersList from './components/ContainersList';
import ServiceCard from './components/ServiceCard';
import SendScraper from './components/SendScraper';
import NavigationBar from './components/Navbar';
import WorkersChart from './components/WorkersChart';
import ServicesPage from './pages/ServicesPage';
import SettingsPage from './pages/SettingsPage';

function App() {
    return (
        <Router>
            <div className="App">
                <NavigationBar />
                <div className="container py-4">
                    <Routes>
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/" element={
                            <div className="row">
                                <div className="col-md-5">
                                    <ServiceCard />
                                    <WorkersChart />
                                </div>
                                <div className="col-md-7">
                                    <SendScraper />
                                    <ContainersList />
                                </div>
                            </div>
                        } />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;