import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import RecommendCard from '../cards/RecommendCard';
import { Card, Icon, Input, Divider, Button, Image, Modal, Grid, Container, Responsive, Form, TextArea, Label } from 'semantic-ui-react';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "usertestssss",
            firstname: "ชื่อจริง",
            lastname: "นามสกุล",
            rate: "4.93",
            about: "asdfasdfasdfasdfasdf",
            email: "abcd@mail.co",
            phone: "0915466421"
        };

        this.validator = new SimpleReactValidator({
            element: message => <div><Label basic color='red' pointing>{message}</Label><br /></div>,
            messages: {
                required: 'โปรดระบุ:attribute',
                phone: 'โปรดระบุเบอร์โทรศัพท์ 10 หลัก'
            }
        });
    }

    onSubmit = e => {
        if (this.validator.allValid()) {
            e.preventDefault();
            this.handleCloseModal();
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }
    }

    componentDidMount() {
        document.title = "🐤 Profile"
    }

    // Handle fields change
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    };

    state = { modalOpen: false }

    handleOpenModal = () => this.setState({ modalOpen: true })

    handleCloseModal = () => this.setState({ modalOpen: false })

    render() {
        return (
            <Responsive>
                <Container fluid>
                    <Grid className='mb-4' centered>
                        <Grid.Column mobile={15} tablet={5} computer={5}>
                            <Card fluid>
                                <Card.Content>
                                    <Image src={require('../imgs/Logo.png')} size='small' centered wrapped />
                                    <Divider />
                                    <Card.Description textAlign='left' className='pb-1'>
                                        <Icon name='yellow star' />
                                        {this.state.rate}
                                    </Card.Description>
                                    <Card.Description textAlign='left' className='pb-1'>
                                        <Icon name='phone' flipped='horizontally' />
                                        {this.state.phone}
                                    </Card.Description>
                                    <Card.Description textAlign='left' className='pb-1'>
                                        <Icon name='mail' />
                                        {this.state.email}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column mobile={15} tablet={11} computer={11}>
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header textAlign='left'>
                                        {this.state.username}
                                        <Button onClick={this.handleOpenModal} basic circular icon='edit outline' floated='right'></Button>
                                    </Card.Header>
                                    <Card.Description textAlign='left'>
                                        {this.state.firstname + ' ' + this.state.lastname}
                                    </Card.Description>
                                    <Card.Description textAlign='left'>
                                        {this.state.about}
                                    </Card.Description>
                                    <Divider />
                                    <RecommendCardList />
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid>

                    <Modal
                        open={this.state.modalOpen}
                        onClose={this.handleCloseModal}
                        className="modal-paku"
                        closeOnDimmerClick={false}
                        size='small'
                    >
                        <Modal.Header>แก้ไขข้อมูลส่วนตัว</Modal.Header>
                        <Modal.Content>
                            <Modal.Description>
                                <Form className="text-left">
                                    <Form.Field>
                                        <Input fluid iconPosition='left' defaultValue={this.state.username} disabled>
                                            <Icon name='user' />
                                            <input type="text" />
                                        </Input>
                                    </Form.Field>
                                    <Form.Field>
                                        <Input fluid iconPosition='left' defaultValue={this.state.firstname + ' ' + this.state.lastname} disabled>
                                            <Icon name='vcard' />
                                            <input type="text" />
                                        </Input>
                                    </Form.Field>
                                    <Form.Field>
                                        <Input fluid iconPosition='left' defaultValue={this.state.email} disabled>
                                            <Icon name='mail' />
                                            <input type="text" />
                                        </Input>
                                    </Form.Field>
                                    <Form.Field>
                                        <TextArea rows={3} placeholder='Tell us more' onChange={this.handleChange('about')} defaultValue={this.state.about} />
                                    </Form.Field>
                                    <Form.Field>
                                        <Input fluid iconPosition='left' placeholder={this.state.phone}>
                                            <Icon name='phone' flipped='horizontally' />
                                            <input type="text" onChange={this.handleChange('phone')} defaultValue={this.state.phone} />
                                        </Input>
                                    </Form.Field>
                                </Form>
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='red' onClick={this.handleCloseModal}>
                                <Icon name='remove' /> Cancel
                            </Button>
                            <Button color='green' onClick={this.onSubmit}>
                                <Icon name='checkmark' /> Submit
                            </Button>
                        </Modal.Actions>
                    </Modal>

                </Container>
            </Responsive>
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