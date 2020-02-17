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

    render() {
        return (
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
        );
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
