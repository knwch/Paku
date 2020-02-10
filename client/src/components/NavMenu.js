import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Responsive, Button, Segment, Icon, Sidebar, Header, Image, Container, Label } from "semantic-ui-react";
import { Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions';

class NavMenu extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        const { children } = this.props
        const { isAuthenticated, user } = this.props.auth;
        const guestLinks = (
            <Nav className="w-100 justify-content-center nowrap">
                <Nav.Link href="/owner">ให้เช่าที่จอดรถ</Nav.Link>
                <Nav.Link href="/rent">จองที่จอดรถ</Nav.Link>
                <Nav.Link href="/support">ช่วยเหลือ</Nav.Link>
                <Nav.Link href="/register">ลงทะเบียน</Nav.Link>
                <Nav.Link href="/login">เข้าสู่ระบบ</Nav.Link>
            </Nav>
        );
        const authLinks = (
            <Nav className="w-100 justify-content-center nowrap">
                <Nav.Link href="/owner">ให้เช่าที่จอดรถ</Nav.Link>
                <Nav.Link href="/rent">จองที่จอดรถ</Nav.Link>
                <Nav.Link href="/support">ช่วยเหลือ</Nav.Link>
                <Nav.Link href="/profile">โปรไฟล์</Nav.Link>
                <Nav.Link onClick={this.onLogout.bind(this)}>ออกจากระบบ</Nav.Link>
            </Nav>
        );

        return (
            <div className="mt-3 mb-5 mx-3">
                <Navbar className="justify-content-center" expand="sm">
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
                </Navbar>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(NavMenu);
