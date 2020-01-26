import React, { Component } from 'react';

class ContactCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "Name Name",
            telephone: "aaaaaaaa",
            email: "ccc",
            rating: "123"
        };
    }

    render() {
        return (
            <div className="Card">
                <div className="card mb-4">
                    <div className="card-body p-0 pt-2">
                        <div className="border-bottom">
                            <img className="mb-2" src={require('../../../components/imgs/Logo.png')} width="50" /><br />
                        </div>
                        <text className="card-text"> {this.state.telephone} </text><br />
                        <text className="card-text"> {this.state.email} </text><br />
                        <text className="card-text"> {this.state.rating} </text>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactCard;
