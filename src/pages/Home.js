import React from 'react';
import ServiceCard from '../components/ServiceCard';
import WorkersChart from '../components/WorkersChart';
import SendScraper from '../components/SendScraper';
import ContainersList from '../components/ContainersList';

const Home = () => {
    return (
        <div className="row">
            <div className="col-md-7">
                <ContainersList />
                <SendScraper />
            </div>
            <div className="col-md-5">
                <WorkersChart />
                <ServiceCard />
            </div>
        </div>
    );
};

export default Home;