import React, { Component } from "react";
import { Responsive, Menu, Table, Button, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import { getUsers } from "../../redux/actions/adminActions";
import { clearCurrentProfile } from "../../redux/actions/profileActions";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/th";

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      activeItem: "usermenu",
      errors: {},
    };
  }

  componentWillMount() {
    document.title = "Paku - Admin";

    this.props.getUsers();

    if (this.props.auth.isAuthenticated === false) {
      this.props.history.push("/login");
    }
  }

  componentWillReceiveProps(nextProps) {
    const users = nextProps.admin.users;

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (users !== null) {
      this.setState({
        users: users,
      });
    }
  }

  onLogout(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
    window.location.href = "/";
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  showUserTable = () => {
    return (
      <Table color="red" celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.HeaderCell>Verified</Table.HeaderCell>
            <Table.HeaderCell>Registered</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.users.map((user, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>
                  <Image src={user.photo_user} avatar /> {user.username}
                </Table.Cell>
                <Table.Cell>
                  {user.name.firstname} {user.name.lastname}
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.phone}</Table.Cell>
                {(() => {
                  if (user.Card.idCard !== 0 && user.Card.confirm === false) {
                    return <Table.Cell>Waiting</Table.Cell>;
                  } else if (user.Card.confirm === true) {
                    return <Table.Cell>Yes</Table.Cell>;
                  } else if (user.Card.confirm === false) {
                    return <Table.Cell>No</Table.Cell>;
                  }
                })()}
                <Table.Cell>
                  {" "}
                  {moment(new Date(user.created)).locale("en").format("ll")}
                </Table.Cell>
                <Table.Cell collapsing>
                  <Button compact inverted color="red" size="mini">
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  };

  showVerifyTable = () => {
    return (
      <Table color="violet" celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Identification</Table.HeaderCell>
            <Table.HeaderCell>Registered</Table.HeaderCell>
            <Table.HeaderCell>Verified</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.users.map((user, index) => {
            if (user.Card.idCard !== 0 && user.Card.confirm === false)
              return (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Image src={user.photo_user} avatar /> {user.username}
                  </Table.Cell>
                  <Table.Cell>
                    {user.name.firstname} {user.name.lastname}
                  </Table.Cell>
                  <Table.Cell>{user.Card.idCard}</Table.Cell>
                  <Table.Cell>
                    {" "}
                    {moment(new Date(user.created)).locale("en").format("ll")}
                  </Table.Cell>
                  <Table.Cell>Waiting</Table.Cell>
                  <Table.Cell collapsing>
                    <Link
                      to={{
                        pathname: "/verifyuser",
                        data: user,
                      }}
                    >
                      <Button compact inverted color="violet" size="mini">
                        Inspect
                      </Button>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              );
          })}
        </Table.Body>
      </Table>
    );
  };

  render() {
    var rendererList;

    if (this.state.activeItem === "usermenu") {
      rendererList = this.showUserTable();
    }
    if (this.state.activeItem === "verifymenu") {
      rendererList = this.showVerifyTable();
    }

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
          <Menu.Item
            name="usermenu"
            active={this.state.activeItem === "usermenu"}
            onClick={this.handleItemClick}
          >
            จัดการผู้ใช้งาน
          </Menu.Item>

          <Menu.Item
            name="verifymenu"
            active={this.state.activeItem === "verifymenu"}
            onClick={this.handleItemClick}
          >
            การยืนยันตัวตน
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item name="logout" onClick={this.onLogout.bind(this)}>
              ออกจากระบบ
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        {rendererList}

        {console.log(this.state.users)}
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
  getUsers,
})(Admin);
