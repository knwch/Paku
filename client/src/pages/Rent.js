import React, { Component } from 'react';
import MapContainer from '../components/Map/MapContainer';
import NearbyCard from '../components/cards/NearbyCard';

class Rent extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8">
                        <MapContainer />
                    </div>
                    <div className="col-md-4">
                            <NearbyCard />
                            <NearbyCard />
                            <NearbyCard />
                    </div>
                </div>
            </div>
        );
    }
}

export default Rent;