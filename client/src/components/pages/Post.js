import React, { Component } from 'react';
import PostFormStep1 from '../forms/postforms/PostFormStep1';
import PostFormStep2 from '../forms/postforms/PostFormStep2';
import PostFormStep3 from '../forms/postforms/PostFormStep3';
import PostConfirm from '../forms/postforms/PostConfirm';
import PostSuccess from '../forms/postforms/PostSuccess';

class Post extends Component {
    componentDidMount() {
        document.title = "Paku - Posting"
    }

    state = {
        step: 1,
        name: '',
        location: '',
        parkingtype: '',
        slot: '',
        cartype: '',
        open: '',
        close: '',
        detail: '',
        rule: [],
        nearby: [],
        facility: '',
        price: '',
        picture: ''
    };

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
    // handleChange = input => (e) => {
    //     this.setState({ [input]: e.target.value });
    //     console.log(e.target.value)
    // };

    handleChange = input => (e, {value}) => {
        this.setState({ [input]: value });
        console.log(value);
    }

    render() {
        const { step } = this.state;
        const { name,
            location,
            parkingtype,
            slot,
            cartype,
            open,
            close,
            detail,
            rule,
            nearby,
            facility,
            price,
            picture } = this.state;
        const values =
        {
            name,
            location,
            parkingtype,
            slot,
            cartype,
            open,
            close,
            detail,
            rule,
            nearby,
            facility,
            price,
            picture
        };

        // eslint-disable-next-line default-case
        switch (step) {
            case 1:
                return (
                    <PostFormStep1
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        handleSelect={this.handleSelect}
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
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                );
            case 4:
                return (
                    <PostConfirm
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        values={values}
                    />
                );
            case 5:
                return <PostSuccess />;
        }

    }
}

export default Post;