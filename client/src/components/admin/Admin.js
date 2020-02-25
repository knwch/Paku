import React, { Component } from "react";
import {
  Responsive,
  Menu,
  Table,
  Button,
  Image,
  Modal,
  Header,
  Loader,
} from "semantic-ui-react";
import { connect } from "react-redux";
import _ from "lodash";
import { logoutUser } from "../../redux/actions/authActions";
import { getUsers, delUser } from "../../redux/actions/adminActions";
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
      activeSubItem: "all",
      modalDeleteOpen: false,
      temp_userdata: null,
      column: null,
      direction: null,
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

    if (users != null) {
      if (users.user !== "No have user") {
        if (users.length !== 0) {
          this.setState({
            users: users,
          });
        }
      }
    }
  }

  onLogout(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
    window.location.href = "/";
  }

  handleSort = (clickedColumn) => () => {
    const { column, users, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        users: _.sortBy(users, [clickedColumn]),
        direction: "ascending",
      });

      return;
    }

    this.setState({
      users: users.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending",
    });
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleSubItemClick = (e, { name }) => this.setState({ activeSubItem: name });

  deleteUser = async (userid) => {
    this.setState({ modalDeleteOpen: false });
    await this.props.delUser(userid);
    this.setState({
      users: this.props.admin.users,
    });
  };

  showRow = (user, index) => {
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
          } else if (user.Card.idCard === 0 && user.Card.confirm === false) {
            return <Table.Cell>No</Table.Cell>;
          }
        })()}
        <Table.Cell>
          {" "}
          {moment(new Date(user.created)).locale("en").format("ll")}
        </Table.Cell>
        <Table.Cell collapsing>
          <Button
            onClick={() => {
              this.setState({
                temp_userdata: user,
                modalDeleteOpen: true,
              });
            }}
            compact
            inverted
            color="red"
            size="mini"
          >
            Delete
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  };

  showUserTable = () => {
    const { column, direction } = this.state;
    return (
      <Table color="red" sortable celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === "username" ? direction : null}
              onClick={this.handleSort("username")}
            >
              Username
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "name" ? direction : null}
              onClick={this.handleSort("name")}
            >
              Name
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "email" ? direction : null}
              onClick={this.handleSort("email")}
            >
              Email
            </Table.HeaderCell>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.HeaderCell>Verified</Table.HeaderCell>
            <Table.HeaderCell>Registered</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>

        {(() => {
          if (this.state.activeSubItem === "all") {
            return (
              <Table.Body>
                {this.state.users.map((user, index) => {
                  return this.showRow(user, index);
                })}
              </Table.Body>
            );
          } else if (this.state.activeSubItem === "verified") {
            return (
              <Table.Body>
                {this.state.users.map((user, index) => {
                  if (user.Card.confirm === true) {
                    return this.showRow(user, index);
                  } else return null;
                })}
              </Table.Body>
            );
          } else if (this.state.activeSubItem === "waitverify") {
            return (
              <Table.Body>
                {this.state.users.map((user, index) => {
                  if (user.Card.idCard !== 0 && user.Card.confirm === false) {
                    return this.showRow(user, index);
                  } else return null;
                })}
              </Table.Body>
            );
          } else if (this.state.activeSubItem === "notverify") {
            return (
              <Table.Body>
                {this.state.users.map((user, index) => {
                  if (user.Card.idCard === 0 && user.Card.confirm === false) {
                    return this.showRow(user, index);
                  } else return null;
                })}
              </Table.Body>
            );
          }
        })()}

        {/* <Table.Footer>
          <Table.Row>
            <Table.HeaderCell>Total {this.state.users.length} users</Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
          </Table.Row>
        </Table.Footer> */}
      </Table>
    );
  };

  showVerifyTable = () => {
    const { column, direction } = this.state;
    return (
      <Table color="violet" sortable celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === "username" ? direction : null}
              onClick={this.handleSort("username")}
            >
              Username
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "name" ? direction : null}
              onClick={this.handleSort("name")}
            >
              Name
            </Table.HeaderCell>
            <Table.HeaderCell>Identification</Table.HeaderCell>
            <Table.HeaderCell>Registered</Table.HeaderCell>
            <Table.HeaderCell>Verified</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.users.map((user, index) => {
            if (user.Card.idCard !== 0 && user.Card.confirm === false) {
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
            } else return null;
          })}
        </Table.Body>
      </Table>
    );
  };

  render() {
    var rendererList;
    var modalPopup;

    if (this.state.activeItem === "usermenu") {
      rendererList = this.showUserTable();
    }
    if (this.state.activeItem === "verifymenu") {
      rendererList = this.showVerifyTable();
    }

    if (this.state.temp_userdata !== null) {
      modalPopup = (
        <Modal
          open={this.state.modalDeleteOpen}
          className="modal-paku"
          size="tiny"
        >
          <Modal.Content>
            <Header
              icon="delete"
              content={`คุณต้องการลบ ${this.state.temp_userdata.username} ใช่หรือไม่`}
            />
          </Modal.Content>
          <Modal.Actions>
            <Button
              basic
              onClick={() => {
                this.setState({
                  temp_userdata: null,
                  modalDeleteOpen: false,
                });
              }}
            >
              <text>กลับ</text>
            </Button>
            <Button
              className="btn-paku-delete"
              onClick={this.deleteUser.bind(this, this.state.temp_userdata._id)}
            >
              <text>ลบ</text>
            </Button>
          </Modal.Actions>
        </Modal>
      );
    }

    const { admin, loading } = this.props.admin;
    if (admin === null || loading) {
      return (
        <Modal open={loading} className="modal-paku" size="mini" basic>
          <Loader size="large" active inline="centered">
            <p>โปรดรอสักครู่</p>
          </Loader>
        </Modal>
      );
    } else {
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
              รอการยืนยันตัวตน
            </Menu.Item>

            <Menu.Menu position="right">
              <Menu.Item name="logout" onClick={this.onLogout.bind(this)}>
                ออกจากระบบ
              </Menu.Item>
            </Menu.Menu>
          </Menu>

          {(() => {
            if (this.state.activeItem === "usermenu") {
              return (
                <Menu className="pt-2" pointing secondary>
                  <Menu.Item
                    content="ทั้งหมด"
                    name="all"
                    active={this.state.activeSubItem === "all"}
                    onClick={this.handleSubItemClick}
                  />
                  <Menu.Item
                    content="ยืนยันแล้ว"
                    name="verified"
                    active={this.state.activeSubItem === "verified"}
                    onClick={this.handleSubItemClick}
                  />
                  <Menu.Item
                    content="รอการยืนยัน"
                    name="waitverify"
                    active={this.state.activeSubItem === "waitverify"}
                    onClick={this.handleSubItemClick}
                  />
                  <Menu.Item
                    content="ไม่ยืนยัน"
                    name="notverify"
                    active={this.state.activeSubItem === "notverify"}
                    onClick={this.handleSubItemClick}
                  />
                </Menu>
              );
            }
          })()}

          {console.log(this.state)}

          {rendererList}

          {modalPopup}
        </Responsive>
      );
    }
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
  delUser,
})(Admin);
