import React, { Component } from 'react';
import RecommendCard from '../RecommendCard';
import { Card, Icon, Input, Divider, Button, Grid, GridColumn } from 'semantic-ui-react';

class ProfileDetailCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            name: "Name Name Parking",
            rating: "4.93",
            bio: "asdfasdfasdfasdfasdf",
            location: "กรุงเทพมหานคร"
        };
    }

    editStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    };

    // Go back to prev step
    submitStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    };

    // Handle fields change
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    };

    render() {
        const { step } = this.state;
        const { name,
            bio,
            location,
            email,
            telephone }
            = this.state;
        const values =
        {
            name,
            bio,
            location,
            email,
            telephone
        };


        switch (step) {
            case 1:
                return (
                    <Card fluid>
                        <Card.Content>
                            <Card.Header textAlign='left'>{this.state.name}
                                <Button basic circular icon='edit outline' floated='right' onClick={this.editStep}></Button>
                            </Card.Header>
                            <Card.Description textAlign='left'>
                                {this.state.bio}
                            </Card.Description>
                            <Card.Description textAlign='left' className='pt-3'>
                                <Icon name='home' />
                                {this.state.location}
                            </Card.Description>
                            <Divider />
                            <RecommendCardList />
                        </Card.Content>
                    </Card>
                );
            case 2:
                return (
                    <Card fluid>
                        <Card.Content>
                            <Card.Header textAlign='left'>
                                <Input defaultValue={values.name} placeholder={values.name} />
                                <Button basic circular icon='red edit outline' floated='right' onClick={this.submitStep}></Button>
                            </Card.Header>
                            <Card.Description textAlign='left'>
                                <Input defaultValue={values.bio} placeholder={values.bio} />
                            </Card.Description>
                            <Card.Description textAlign='left' className='pt-3'>
                                <Icon name='home' />
                                <Input defaultValue={values.location} placeholder={values.location} />
                            </Card.Description>
                            <Divider />
                            <RecommendCardList />
                        </Card.Content>
                    </Card>
                );
        }
    }
}

function RecommendCardList() {
    return (
        <div>
            <Card.Description textAlign='left' className='pb-3'>
                ที่จอดรถของฉัน
            </Card.Description>
            <Card.Description textAlign='left'>
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
            </Card.Description>
        </div>
    );
}

export default ProfileDetailCard;
