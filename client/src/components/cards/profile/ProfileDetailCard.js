import React, { Component } from 'react';
import RecommendCard from '../RecommendCard';

class ProfileDetailCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "Name Name",
            rating: "4.93",
            bio: "ccc",
            location: "Bangkok"
        };
    }

    render() {
        return (
            <div className="Card">
                <div className="card mb-4 border-0">
                    <div className="card-body text-left p-0 pt-2">
                        <div className="d-flex justify-content-between align-items-center">
                            <text className="card-text font-weight-bold"> {this.state.name} </text>
                            <small className="text-muted"> แก้ไข </small>
                        </div>
                        <text className="card-text"> {this.state.bio} </text><br />
                        <div className="border-top">
                            <text className="card-text"> {this.state.location} </text>
                        </div>
                        <div className="border-top">
                            <text className="card-text"> ที่จอดรถของฉัน </text>
                            <div className="row">
                                <div className="col-md-4">
                                    <RecommendCard />
                                </div>
                                <div className="col-md-4">
                                    <RecommendCard />
                                </div>
                                <div className="col-md-4">
                                    <RecommendCard />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileDetailCard;
