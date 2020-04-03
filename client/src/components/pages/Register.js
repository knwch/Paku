import React, { Component } from "react";
import SimpleReactValidator from "simple-react-validator";
import {
  Responsive,
  Container,
  Icon,
  Input,
  Button,
  Label,
  Form,
  Grid,
  Checkbox,
  Modal,
  Header,
  Transition,
  Loader
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import NavMenu from "../NavMenu";
import { registerUser } from "../../redux/actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      confirmpassword: "",
      firstname: "",
      lastname: "",
      telephone: "",
      email: "",
      terms: false,
      errors: {}
    };

    this.onChange = this.onSubmit.bind(this);
    this.validator = new SimpleReactValidator({
      validators: {
        userror: {
          // name the rule
          message: "ชื่อผู้ใช้ซ้ำ",
          rule: val => val === null
        },
        emerror: {
          // name the rule
          message: "อีเมลซ้ำ",
          rule: val => val === null
        },
        thai: {
          // name the rule
          message: "โปรดระบุ:attributeเป็นภาษาไทย หรือภาษาอังกฤษ",
          rule: (val, params, validator) => {
            return validator.helpers.testRegex(val, /^[a-zA-Zก-๙]*$/i);
          }
        }
      },
      element: message => (
        <div>
          <Transition animation="shake" duration={250} transitionOnMount={true}>
            <Label basic color="red" pointing>
              {message}
            </Label>
          </Transition>
          <br />
        </div>
      ),
      messages: {
        required: "โปรดระบุ:attribute",
        alpha_num: "โปรดระบุเฉพาะตัวอักษรหรือตัวเลขเท่านั้น",
        string: "โปรดระบุเฉพาะตัวอักษรเท่านั้น",
        phone: "โปรดระบุเบอร์โทรศัพท์ 10 หลัก",
        email: "โปรดระบุอีเมล",
        accepted: "โปรดยอมรับข้อกำหนดและเงื่อนไขในการใช้งาน",
        min: ":attributeต้องมีความยาวตั้งแต่ 6 ถึง 30 ตัวอักษร",
        max: ":attributeต้องมีความยาวตั้งแต่ 6 ถึง 30 ตัวอักษร"
      }
    });
  }

  componentDidMount() {
    document.title = "🐤 register";
    document.body.classList.add("Background-Brown");
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    if (this.validator.allValid()) {
      e.preventDefault();
      const newUser = {
        username: this.state.username,
        password: this.state.password,
        password2: this.state.confirmpassword,
        fname: this.state.firstname,
        lname: this.state.lastname,
        email: this.state.email,
        phone: this.state.telephone,
        terms: this.state.terms
      };
      this.props.registerUser(newUser, this.props.history);
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  };

  handleCheckbox = () => {
    this.setState({ terms: !this.state.terms });
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  state = {
    modalOpen: false
  };

  handleOpenModal = () => this.setState({ modalOpen: true });

  handleCloseModal = () => this.setState({ modalOpen: false });

  render() {
    const errors = this.state.errors;
    const { auth, loading } = this.props.auth;
    if (auth === null || loading) {
      return (
        <Modal open={true} className="modal-paku" size="mini" basic>
          <Loader size="large" active inline="centered">
            <p>โปรดรอสักครู่</p>
          </Loader>
        </Modal>
      );
    } else {
      // eslint-disable-next-line default-case
      return (
        <Responsive>
          <NavMenu />
          <Container fluid>
            <Grid className="mb-4">
              <Grid.Row
                style={{ "margin-top": "12vh" }}
                only="computer tablet"
              />

              <Grid.Column mobile={16} tablet={7} computer={6}>
                <h4 className="text-center mb-4">
                  <div>ลงทะเบียน</div>
                </h4>
                <Form className="text-left">
                  <Form.Field>
                    <Input fluid iconPosition="left" placeholder="ชื่อผู้ใช้">
                      <Icon name="user" />
                      <input
                        type="text"
                        maxlength="30"
                        onChange={this.handleChange("username")}
                        defaultValue={this.state.username}
                      />
                    </Input>
                    {this.validator.message(
                      "ชื่อผู้ใช้",
                      this.state.username,
                      "required|alpha_num|min:6|max:30"
                    )}
                    {this.validator.message(
                      "error",
                      errors.username,
                      "userror"
                    )}
                    {(errors.username = "")}
                  </Form.Field>

                  <Form.Group widths="equal">
                    <Form.Field>
                      <Input
                        fluid
                        iconPosition="left"
                        placeholder="สร้างรหัสผ่าน"
                      >
                        <Icon name="unlock" />
                        <input
                          type="password"
                          maxlength="30"
                          onChange={this.handleChange("password")}
                          defaultValue={this.state.password}
                        />
                      </Input>
                      {this.validator.message(
                        "รหัสผ่าน",
                        this.state.password,
                        "required|min:6,string|max:30,string"
                      )}
                    </Form.Field>

                    <Form.Field>
                      <Input
                        fluid
                        iconPosition="left"
                        placeholder="ยืนยันรหัสผ่าน"
                      >
                        <Icon name="unlock alternate" />
                        <input
                          type="password"
                          maxlength="30"
                          onChange={this.handleChange("confirmpassword")}
                          defaultValue={this.state.confirmpassword}
                        />
                      </Input>
                      {this.validator.message(
                        "ยืนยันรหัสผ่าน",
                        this.state.confirmpassword,
                        `required|in:${this.state.password}`,
                        { messages: { in: "รหัสผ่านไม่ตรงกัน" } }
                      )}
                    </Form.Field>
                  </Form.Group>

                  <small className="mb-1">
                    กรุณากรอกชื่อ และนามสกุลจริงของคุณ
                  </small>
                  <Form.Group widths="equal">
                    <Form.Field>
                      <Input fluid iconPosition="left" placeholder="ชื่อจริง">
                        <Icon name="vcard" />
                        <input
                          type="text"
                          onChange={this.handleChange("firstname")}
                          defaultValue={this.state.firstname}
                        />
                      </Input>
                      {this.validator.message(
                        "ชื่อจริง",
                        this.state.firstname,
                        "required|thai"
                      )}
                    </Form.Field>

                    <Form.Field>
                      <Input fluid iconPosition="left" placeholder="นามสกุล">
                        <Icon name="vcard" />
                        <input
                          type="text"
                          onChange={this.handleChange("lastname")}
                          defaultValue={this.state.lastname}
                        />
                      </Input>
                      {this.validator.message(
                        "นามสกุล",
                        this.state.lastname,
                        "required|thai"
                      )}
                    </Form.Field>
                  </Form.Group>

                  <Form.Field>
                    <Input fluid iconPosition="left" placeholder="อีเมล">
                      <Icon name="envelope" />
                      <input
                        type="email"
                        onChange={this.handleChange("email")}
                        defaultValue={this.state.email}
                      />
                    </Input>
                    {this.validator.message(
                      "อีเมล",
                      this.state.email,
                      "required|email"
                    )}
                    {this.validator.message("error", errors.email, "emerror")}
                    {(errors.email = "")}
                  </Form.Field>

                  <Form.Field>
                    <Input
                      fluid
                      iconPosition="left"
                      placeholder="เบอร์โทรศัพท์"
                    >
                      <Icon name="phone" flipped="horizontally" />
                      <input
                        maxlength="10"
                        type="text"
                        onChange={this.handleChange("telephone")}
                        defaultValue={this.state.telephone}
                      />
                    </Input>
                    {this.validator.message(
                      "เบอร์โทรศัพท์",
                      this.state.telephone,
                      "required|phone"
                    )}
                  </Form.Field>

                  {/* <Form.Field>
                  <div>วันเกิด</div>
                  <Input fluid iconPosition='left' placeholder='วันเกิด'>
                    <Icon name='birthday' />
                    <input type="date" onChange={this.handleChange('birth')} defaultValue={this.state.birth} />
                  </Input>
                  {this.validator.message('วันเกิด', this.state.birth && moment(this.state.birth, 'YYYY-DD-MM'), 'required|date')}
                </Form.Field> */}

                  <Form.Field>
                    <Checkbox
                      onClick={this.handleCheckbox}
                      className="align-middle"
                    >
                      <input
                        type="checkbox"
                        onChange={this.handleChange("terms")}
                        defaultValue={this.state.terms}
                      />
                    </Checkbox>
                    <a className="align-middle">
                      &nbsp;ฉันยอมรับ
                      <a href="#" onClick={this.handleOpenModal}>
                        ข้อกำหนดและเงื่อนไขในการใช้งาน
                      </a>
                    </a>
                    {this.validator.message(
                      "terms",
                      this.state.terms,
                      "accepted"
                    )}
                  </Form.Field>

                  <Modal
                    open={this.state.modalOpen}
                    onClose={this.handleCloseModal}
                    className="modal-paku"
                  >
                    <Header
                      icon="browser"
                      content="ข้อกำหนดและเงื่อนไขในการใช้งาน"
                    />
                    <Modal.Content>
                      <Modal.Description>
                        <Header>ฟหกด่าสว</Header>
                        <p>
                          We've found the following gravatar image associated
                          with your e-mail address.
                        </p>
                        <p>Is it okay to use this photo?</p>
                      </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button
                        onClick={this.handleCloseModal}
                        className="btn-paku"
                        color="yellow"
                      >
                        ปิด <Icon name="right chevron" />
                      </Button>
                    </Modal.Actions>
                  </Modal>

                  <div className="d-flex justify-content-end">
                    <Button
                      onClick={this.onSubmit}
                      className="btn-paku"
                      color="yellow"
                      animated
                    >
                      <Button.Content visible>ยืนยัน</Button.Content>
                      <Button.Content hidden>
                        <Icon name="arrow right" />
                      </Button.Content>
                    </Button>
                  </div>
                </Form>
              </Grid.Column>
            </Grid>
          </Container>
        </Responsive>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
