import React, { Component } from 'react';
import { Card, Icon, Image, Divider } from 'semantic-ui-react';

class ContactCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "Name Name",
            telephone: "0915466421",
            email: "ccc",
            rating: "123"
        };
    }

    render() {
        return (
            <Card fluid>
                <Card.Content>
                    <Image src={require('../../imgs/Logo.png')} size='small' centered wrapped />
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
        );
    }
}

export default ContactCard;
