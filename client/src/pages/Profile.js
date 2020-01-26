import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProfileDetailCard from '../components/cards/profile/ProfileDetailCard';
import ContactCard from '../components/cards/profile/ContactCard';

class Profile extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <ContactCard />
                    </div>
                    <div className="col-md-8">
                        <ProfileDetailCard />
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;