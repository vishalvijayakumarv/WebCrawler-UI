import React from 'react';
import ServiceCard from '../components/ServiceCard';
import WorkersChart from '../components/WorkersChart';
import ContainersList from '../components/ContainersList';
import SendScraper from '../components/SendScraper';
const Home = () => {
    return (
        <div className="row">
            <div className="col-md-7">
                <ContainersList />
            </div>
            <div className="col-md-5">
                <SendScraper />
                
                <ServiceCard />
                <WorkersChart />
            </div>
        </div>
    );
};

export default Home;