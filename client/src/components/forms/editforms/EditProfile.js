import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EditProfile extends Component {
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

export default EditProfile;