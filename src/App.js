import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Home from './pages/Home';
import ServicesPage from './pages/Services';
import SendScraper from './components/SendScraper';
import SettingsPage from './pages/Settings';
import './styles/App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <NavigationBar />
                <div className="main-content">
                    <div className="container py-4">
                        <Routes>
                            <Route path="/add-job" element={<SendScraper />} />
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