import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Icon, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions';
import { clearCurrentProfile } from '../redux/actions/profileActions';

class NavMenu extends Component {

    onLogout(e) {
        e.preventDefault();
        window.location.href = "/";
        this.props.clearCurrentProfile();
        this.props.logoutUser();
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const guestLinks = (
            <Nav className="nav-mobile ml-auto nowrap">
                <Nav.Link className="nav-color mr-3" href="/owner">ให้เช่าที่จอดรถ</Nav.Link>
                <Nav.Link className="nav-color mr-3" href="/rent">จองที่จอดรถ</Nav.Link>
                <Nav.Link className="nav-color mr-3" href="/support">ช่วยเหลือ</Nav.Link>
                <Nav.Link className="nav-color mr-3" href="/register">ลงทะเบียน</Nav.Link>
                <Nav.Link className="nav-color" href="/login">เข้าสู่ระบบ</Nav.Link>
            </Nav>
        );
        const authLinks = (
            <Nav className="ml-auto nowrap">
                <Nav.Link className="nav-color mr-3" href="/owner">ให้เช่าที่จอดรถ</Nav.Link>
                <Nav.Link className="nav-color mr-3" href="/rent">จองที่จอดรถ</Nav.Link>
                <Nav.Link className="nav-color mr-3" href="/support">ช่วยเหลือ</Nav.Link>
                <Nav.Link><Icon name="black bell"/></Nav.Link>
                <NavDropdown alignRight title={<Icon name="black user"/>} id="basic-nav-dropdown">
                    <NavDropdown.Item href="/profile">โปรไฟล์</NavDropdown.Item>
                    <NavDropdown.Item onClick={this.onLogout.bind(this)}>ออกจากระบบ</NavDropdown.Item>
                </NavDropdown>
                {/* <Nav.Link className="nav-color" href="/profile">โปรไฟล์</Nav.Link> */}
                {/* <Nav.Link className="nav-color" onClick={this.onLogout.bind(this)}>ออกจากระบบ</Nav.Link> */}
            </Nav>
        );

        return (
            <div className="my-4 mx-4" id="nav-color" >
                {/* <Navbar className="justify-content-center" expand="sm">
                    <div className="d-flex w-50 mr-auto">
                        <Navbar.Brand href="/">
                            <img className="logo-paku" src={require("./imgs/Logo.png")} />
                        </Navbar.Brand>
                    </div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="w-100" id="basic-navbar-nav">
                        {isAuthenticated ? authLinks : guestLinks}
                    </Navbar.Collapse>
                    <div className="ml-auto w-50 justify-content-end"></div>
                </Navbar> */}
                <Navbar expand="sm">
                    <Navbar.Brand href="/">
                        <img className="logo-paku" src={require("./imgs/Logo.png")} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {isAuthenticated ? authLinks : guestLinks}
                    </Navbar.Collapse>
                </Navbar>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(NavMenu);
