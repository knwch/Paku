import React, { Component } from "react";
import {
  Responsive,
  Menu,
  Card,
  Icon,
  Button,
  Image,
  Grid,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import { clearCurrentProfile } from "../../redux/actions/profileActions";
import moment from "moment";
import "moment/locale/th";

class VerifyUser extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      errors: {},
    };
  }

  componentWillMount() {
    document.title = "Paku - Admin";

    if (this.props.auth.isAuthenticated === false) {
      this.props.history.push("/login");
    }

    const { data } = this.props.location;
    let routeState;
    if (data) {
      localStorage.setItem("routeState", JSON.stringify(data));
      routeState = data;
    } else {
      routeState = localStorage.getItem("routeState");
      if (routeState) routeState = JSON.parse(routeState);
    }

    this.setState({
      user: routeState,
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
    window.location.href = "/";
  }

  handleItemClick = () => (window.location.href = "/admin");

  render() {
    return (
      <Responsive
        style={{
          "margin-left": "-1.5rem",
          "margin-right": "-1.5rem",
        }}
      >
        <Menu
          style={{
            "margin-top": "1.5rem",
          }}
        >
          <Menu.Item name="backmenu" onClick={this.handleItemClick}>
            กลับ
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item name="logout" onClick={this.onLogout.bind(this)}>
              ออกจากระบบ
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Grid columns={2}>
          <Grid.Column>
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
          <Grid.Column textAlign="left">
            <Card fluid>
              <Card.Content>
                <Card.Header>Matthew</Card.Header>
                <Card.Meta>
                  <span className="date">Joined in 2015</span>
                </Card.Meta>
                <Card.Description>
                  Matthew is a musician living in Nashville.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name="user" />
                  22 Friends
                </a>
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
  admin: state.admin,
});

export default connect(mapStateToProps, {
  logoutUser,
  clearCurrentProfile,
})(VerifyUser);
