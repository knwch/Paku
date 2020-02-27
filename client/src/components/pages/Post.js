import React, { Component } from 'react';
import PostFormStep1 from '../forms/postforms/PostFormStep1';
import PostFormStep2 from '../forms/postforms/PostFormStep2';
import PostFormStep3 from '../forms/postforms/PostFormStep3';
import PostConfirm from '../forms/postforms/PostConfirm';
import { addPost } from '../../redux/actions/postActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            title: '',
            picture: '',
            price: '',
            typeofpark: '',
            numberofcar: '',
            typeofcar: '',
            explain: '',
            rule: '',
            nearby: '',
            facility: '',
            open: '',
            close: '',
            address: '',
            location: {
                lat: 13.7563,
                lng: 100.5018
            },
            zoom: 16,
            show: false
        }
    };

    componentDidMount = () => {
        document.title = "Paku - Posting"
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.setState(prevState => ({
                        location: {
                            ...prevState.currentLatLng,
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        },
                        zoom: 16,
                        show: true
                    }))
                }
            )
        }
    };

    handleMarker = ({ lat, lng }) => {
        console.log(lat, lng)
        this.setState({
            location: {
                lat: lat,
                lng: lng
            }
        })
        this.setState({ show: true })
    }

    // Proceed to next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    };

    // Go back to prev step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    };

    // Handle fields change
    handleChange = input => (e, { value }) => {
        this.setState({ [input]: value });
        console.log(value);
        console.log(this.state.price);
    }

    handleSubmit = (e) => {
        console.log(this.state)
        e.preventDefault();
        const newPost = {
            title: this.state.title,
            location: this.state.location,
            longitude: this.state.location.longitude,
            latitude: this.state.location.latitude,
            address: this.state.address,
            open: this.state.open,
            close: this.state.close,
            typeofpark: this.state.typeofpark,
            numberofcar: this.state.numberofcar,
            typeofcar: this.state.typeofcar,
            explain: this.state.explain,
            rule: this.state.rule,
            nearby: this.state.nearby,
            facility: this.state.facility,
            price: this.state.price,
        }
        this.props.addPost(newPost);
    }

    render() {
        const { step } = this.state;
        const {
            title,
            address,
            location,
            open,
            close,
            typeofpark,
            numberofcar,
            typeofcar,
            explain,
            rule,
            nearby,
            facility,
            zoom,
            show,
            price,
            photos } = this.state;
        const values =
        {
            title,
            address,
            location,
            zoom,
            show,
            open,
            close,
            typeofpark,
            numberofcar,
            typeofcar,
            explain,
            rule,
            nearby,
            facility,
            price,
            photos
        };

        // eslint-disable-next-line default-case
        switch (step) {
            case 1:
                return (
                    <PostFormStep1
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        handleMarker={this.handleMarker}
                        values={values}
                    />
                );
            case 2:
                return (
                    <PostFormStep2
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                );
            case 3:
                return (
                    <PostFormStep3
                        nextStep={this.handleSubmit}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                );
            case 4:
                return (
                    <PostConfirm
                        values={values}
                    />
                );
        }

    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post,
    errors: state.errors
});

export default connect(mapStateToProps, { addPost })(withRouter(Post))