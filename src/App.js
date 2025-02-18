import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import ServicesPage from './pages/Services';
import SettingsPage from './pages/Settings';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <NavigationBar />
                <Sidebar />
                <div className="main-content">
                    <div className="container py-4">
                        <Routes>
                            <Route path="/services" element={<ServicesPage />} />
                            <Route path="/settings" element={<SettingsPage />} />
                            <Route path="/" element={<Home />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;