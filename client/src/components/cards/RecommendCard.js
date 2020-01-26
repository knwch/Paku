import React, { Component } from 'react';

class RecommendCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "aaa",
            rating: "4.93",
            area: "ccc",
            price: "ddd"
        };
    }

    render() {
        return (
            <div className="Card">
                <div className="card mb-4 border-0">
                    <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                    <div className="card-body text-left p-0 pt-2">
                        <div className="d-flex justify-content-between align-items-center">
                            <text className="card-text font-weight-bold"> {this.state.name} </text>
                            <small className="text-muted"> {this.state.rating} </small>
                        </div>
                        <small className="card-text"> {this.state.area} </small><br></br>
                        <small className="card-text font-weight-bold"> {this.state.price} / HOUR</small>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecommendCard;