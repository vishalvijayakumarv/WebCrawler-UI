import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import SendScraper from './components/SendScraper';
import Home from './pages/Home';
import ServicesPage from './pages/Services';
import SettingsPage from './pages/Settings';
import ReportsPage from './pages/Reports';

function App() {
    return (
        <Router>
            <div className="app-container">
                <NavigationBar />
                <div className="main-content">
                    <div className="container py-4">
                        <Routes>
                            <Route path="/services" element={<ServicesPage />} />
                            <Route path="/settings" element={<SettingsPage />} />
                            <Route path="/reports" element={<ReportsPage/>}/>
                            <Route path="/" element={<Home />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;