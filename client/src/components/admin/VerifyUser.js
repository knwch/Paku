import React, { Component } from 'react';
import { Responsive, Menu, Card, Button, Image, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { confirmUser, UnConfirmUser } from '../../redux/actions/adminActions';
import { logoutUser } from '../../redux/actions/authActions';
import { clearCurrentProfile } from '../../redux/actions/profileActions';
import moment from 'moment';
import 'moment/locale/th';

class VerifyUser extends Component {
    constructor() {
        super();
        this.state = {
            user: {},
            errors: {}
        };
    }

    componentWillMount() {
        document.title = 'Paku - Admin';

        if (this.props.auth.isAuthenticated === false) {
            this.props.history.push('/login');
        }

        const { data } = this.props.location;
        let routeState;
        if (data) {
            localStorage.setItem('routeState', JSON.stringify(data));
            routeState = data;
        } else {
            routeState = localStorage.getItem('routeState');
            if (routeState) routeState = JSON.parse(routeState);
        }

        this.setState({
            user: routeState
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onLogout(e) {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
        window.location.href = '/';
    }

    handleItemClick = () => (window.location.href = '/admin');

    approveUser = (userid) => {
        this.props.confirmUser(userid);
        // window.location.href = "/admin";
    };

    declineUser = (userid) => {
        this.props.UnConfirmUser(userid);
        // window.location.href = "/admin";
    };

    render() {
        return (
            <Responsive
                style={{
                    'margin-left': '-1.5rem',
                    'margin-right': '-1.5rem'
                }}
            >
                <Menu
                    style={{
                        'margin-top': '1.5rem'
                    }}
                >
                    <Menu.Item name='backmenu' onClick={this.handleItemClick}>
                        กลับ
                    </Menu.Item>
                    <Menu.Item>{this.state.user.username}</Menu.Item>

                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='logout'
                            onClick={this.onLogout.bind(this)}
                        >
                            ออกจากระบบ
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <Grid columns={2} centered>
                    <Grid.Column
                        textAlign='center'
                        mobile={16}
                        tablet={5}
                        computer={5}
                    >
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>Identification card</Card.Header>
                            </Card.Content>
                            <Image
                                src={this.state.user.photo_card.photoCard}
                                wrapped
                                ui={false}
                            />
                        </Card>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>User's photo</Card.Header>
                            </Card.Content>
                            <Image
                                src={this.state.user.photo_card.photoPerson}
                                wrapped
                                ui={false}
                            />
                        </Card>
                    </Grid.Column>
                    <Grid.Column
                        textAlign='left'
                        mobile={16}
                        tablet={6}
                        computer={6}
                    >
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>Information</Card.Header>
                                <Card.Meta>
                                    Username {this.state.user.username}
                                </Card.Meta>
                            </Card.Content>
                            <Card.Content>
                                <Card.Meta className='mb-2'>Name</Card.Meta>
                                <Card.Header>
                                    {this.state.user.name.firstname}{' '}
                                    {this.state.user.name.lastname}
                                </Card.Header>
                            </Card.Content>
                            <Card.Content>
                                <Card.Meta className='mb-2'>
                                    Identification number
                                </Card.Meta>
                                <Card.Header>
                                    {this.state.user.Card.idCard}
                                </Card.Header>
                            </Card.Content>
                            <Card.Content>
                                <Card.Meta className='mb-2'>
                                    Laser number
                                </Card.Meta>
                                <Card.Header>
                                    {this.state.user.Card.laser}
                                </Card.Header>
                            </Card.Content>
                            <Card.Content>
                                <Card.Meta>Email address</Card.Meta>
                                <Card.Description>
                                    {this.state.user.email}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content>
                                <Card.Meta>Phone number</Card.Meta>
                                <Card.Description>
                                    {this.state.user.phone}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                Registered on{' '}
                                {moment(new Date(this.state.user.created))
                                    .locale('en')
                                    .format('ll')}
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                    <Button
                                        onClick={this.declineUser.bind(
                                            this,
                                            this.state.user._id
                                        )}
                                        basic
                                        color='red'
                                    >
                                        Decline
                                    </Button>
                                    <Button
                                        onClick={this.approveUser.bind(
                                            this,
                                            this.state.user._id
                                        )}
                                        basic
                                        color='green'
                                    >
                                        Approve
                                    </Button>
                                </div>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
            </Responsive>
        );
    }
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    auth: state.auth,
    admin: state.admin
});

export default connect(mapStateToProps, {
    logoutUser,
    clearCurrentProfile,
    confirmUser,
    UnConfirmUser
})(VerifyUser);
