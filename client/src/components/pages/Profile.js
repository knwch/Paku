import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RecommendCard from '../cards/RecommendCard';
import { Card, Icon, Input, Divider, Button, Image, Modal, Header, Grid, Container, Responsive, Segment } from 'semantic-ui-react';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "Name Name Parking",
            rate: "4.93",
            bio: "asdfasdfasdfasdfasdf",
            location: "กรุงเทพมหานคร",
            telephone: "0915466421",
            email: "ccc",
        };
    }

    componentDidMount() {
        document.title = "🐤 Profile"
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <Card fluid>
                            <Card.Content>
                                <Image src={require('../imgs/Logo.png')} size='small' centered wrapped />
                                <Divider />
                                <Card.Description textAlign='left' className='pb-1'>
                                    <Icon name='yellow star' />
                                    4.59
                                </Card.Description>
                                <Card.Description textAlign='left' className='pb-1'>
                                    <Icon name='phone' flipped='horizontally' />
                                    {this.state.telephone}
                                </Card.Description>
                                <Card.Description textAlign='left' className='pb-1'>
                                    <Icon name='mail' />
                                    abcd@mail.co
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </div>
                    <div className="col-md-8">
                        <Card fluid>
                            <Card.Content>
                                <Card.Header textAlign='left'>{this.state.name}
                                    <Button basic circular icon='edit outline' floated='right'></Button>
                                </Card.Header>
                                <Card.Description textAlign='left'>
                                    {this.state.bio}
                                </Card.Description>
                                <Divider />
                                <RecommendCardList />
                            </Card.Content>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

function RecommendCardList() {
    return (
        <div>
            <Card.Description textAlign='left' className='pb-1'>
                ที่จอดรถของฉัน
            </Card.Description>
            <Card.Description>
                <Grid textAlign='center' stackable columns={3}>
                    <Grid.Row>
                        <Grid.Column>
                            <RecommendCard />
                        </Grid.Column>
                        <Grid.Column>
                            <RecommendCard />
                        </Grid.Column>
                        <Grid.Column>
                            <RecommendCard />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Card.Description>
        </div>
    );
}

export default Profile;