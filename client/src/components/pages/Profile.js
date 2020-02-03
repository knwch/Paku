import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProfileDetailCard from '../cards/profile/ProfileDetailCard';
import ContactCard from '../cards/profile/ContactCard';

class Profile extends Component {
    componentDidMount(){
        document.title = "🐤 Profile"
    }

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