import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookingForm from '../forms/bookingforms/BookingForm';
import PostDetailCard from '../cards/PostDetailCard';

class Book extends Component {

    state = {
        date: '',
        checkin: '',
        checkout: '',
        telephone: '',
        plate: '',
        note: '',
        type: '',
    };

    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    };

    render() {
        const { date,
            checkin,
            checkout,
            telephone,
            plate,
            note,
            type } = this.state;
        const values =
        {
            date,
            checkin,
            checkout,
            telephone,
            plate,
            note,
            type
        };

        return (
            <div className="container-fluid">
                <div className="row">
                    <Picture />
                    <Picture />
                    <Picture />
                </div>
                <div className="row">

                    {/* Booking Form */}
                    <div className="col-md-6">
                        <div className="Card">
                            <div className="card mb-4 shadow-sm">
                                <div className="card-body text-left">
                                    <BookingForm
                                        handleChange={this.handleChange}
                                        values={values} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <PostDetailCard />
                    </div>

                </div>
            </div>
        );
    }
}

function Picture() {
    return (
        <div className="col-md-4">
            <div className="card mb-4 shadow-sm border-0">
                <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
            </div>
        </div>
    )
}

export default Book;