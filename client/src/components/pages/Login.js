import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { Responsive, Container, Icon, Input, Button, Form, Label, Grid, Modal, Header, Loader, Transition } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../redux/actions/authActions';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.validator = new SimpleReactValidator({
      validators: {
        error: {  // name the rule
          message: 'ชื่อผู้ใช้หรือรหัสผ่านผิด',
          rule: val => (val == null)
        }
      },
      element: message =>
        <div>
          <Transition
            animation='shake'
            duration={250}
            transitionOnMount={true}
          >
            <Label basic color='red' pointing>{message}</Label>
          </Transition>
          <br />
        </div>,
      messages: {
        required: 'โปรดระบุ:attribute',
      }
    });
  }

  componentDidMount() {
    document.title = 'Paku - Login';
    document.body.classList.add('Background-Brown');
    if (this.props.location.state) {
      this.handleRegistModal();
      this.props.history.replace({ state: false })
    }
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
      document.body.classList.remove('Background-Brown');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  onSubmit(e) {
    if (this.validator.fieldValid('รหัสผ่าน') && this.validator.fieldValid('ชื่อผู้ใช้')) {
      e.preventDefault();
      // this.handleLoaderModal();
      const userData = {
        username: this.state.username,
        password: this.state.password
      }
      this.props.loginUser(userData);
      this.validator.showMessages();
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  };


  state = {
    modalRegist: false,
    modalLoader: false
  }

  handleRegistModal = () => {
    this.setState({ modalRegist: true })
    setTimeout(function () {
      this.setState({ modalRegist: false })
    }.bind(this), 2250);
  }

  handleLoaderModal = () => {
    this.setState({ modalLoader: true })
  }

  successRegistModal = () => {
    return (
      <Modal
        open={this.state.modalRegist}
        className="modal-paku"
        size='mini'
      >
        <Modal.Content>
          <div className='text-center'>
            <Transition
              animation='tada'
              duration={1500}
              transitionOnMount={true}
            >
              <Icon.Group size='big'>
                <Icon loading size='huge' name='circle outline' />
                <Icon size='big' name='check' color='yellow' />
              </Icon.Group>
            </Transition>
            <Header>ลงทะเบียนสำเร็จ</Header>
          </div>
        </Modal.Content>
      </Modal>
    );
  }

  render() {
    // const errors = this.state.errors;
    const { auth, loading } = this.props.auth
    if (auth === null || loading) {
      return (
        <Modal
          open={true}
          className="modal-paku"
          size='mini'
          basic
        >
          <Loader size='large' active inline='centered'><p>โปรดรอสักครู่</p></Loader>
        </Modal>
      );
    } else {
      return (
        <Responsive>
          <Container fluid>
            <Grid className='mb-4'>

              <Grid.Row style={{ "margin-top": "20vh" }} only='computer tablet' />

              <Grid.Column mobile={16} tablet={7} computer={6}>
                <h4 className="text-center mb-4"><div>เข้าสู่ระบบ</div></h4>
                <Form>

                  <Form.Field className="text-left">
                    <Input fluid iconPosition='left' placeholder='ชื่อผู้ใช้'>
                      <Icon name='user' />
                      <input type="text" className="form-control" onChange={this.handleChange('username')} defaultValue={this.state.username} />
                    </Input>
                    {this.validator.message('ชื่อผู้ใช้', this.state.username, 'required')}
                  </Form.Field>

                  <Form.Field className="text-left">
                    <Input fluid iconPosition='left' placeholder='รหัสผ่าน'>
                      <Icon name='lock' />
                      <input type="password" className="form-control" onChange={this.handleChange('password')} defaultValue={this.state.password} />
                    </Input>
                    {this.validator.message('รหัสผ่าน', this.state.password, 'required')}
                    {this.validator.message('errors', this.state.errors.username, 'error')}
                    {this.validator.message('errors', this.state.errors.password, 'error')}
                    {console.log(this.state.errors.username + " " + this.state.errors.password)}
                  </Form.Field>

                  <Modal
                    open={this.state.modalLoader}
                    className="modal-paku"
                    size='mini'
                    basic
                  >
                    <Loader size='large' active inline='centered'><p>โปรดรอสักครู่</p></Loader>
                  </Modal>

                  <div className='text-center'>
                    <Button onClick={this.onSubmit} className='btn-paku' color='yellow' animated>
                      <Button.Content visible>เข้าสู่ระบบ</Button.Content>
                      <Button.Content hidden>
                        <Icon name='arrow right' />
                      </Button.Content>
                    </Button>
                  </div>

                </Form>
              </Grid.Column>
            </Grid>
            <this.successRegistModal />
          </Container>
        </Responsive>
      );
    }
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
})

export default connect(mapStateToProps, { loginUser })(withRouter(Login));