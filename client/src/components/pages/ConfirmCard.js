import React, { Component } from "react";
import {
  Grid,
  Form,
  Responsive,
  Container,
  Button,
  Icon,
  Header,
  Modal,
  Input
} from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { storage } from "../../config/firebase-config";
import { addIDcard, getIDcard } from "../../redux/actions/profileActions";
import NavMenu from "../NavMenu";
import Footer from "../Footer";

class ConfirmCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idCard: "",
      laserno: "",
      cardphoto: null,
      cardfiletemp: "",
      userphoto: null,
      userfiletemp: "",
      modalOpen: false,
      statusTemp: true,
      errors: {}
    };
  }

  fileInputRef1 = React.createRef();
  fileInputRef2 = React.createRef();

  componentDidMount = () => {
    document.title = "Paku - Confirm ID Card";
    this.props.getIDcard();
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.idcard.Card.confirm === true) {
      this.props.history.push("/");
    } else if (
      nextProps.profile.idcard.Card.idCard !== 0 &&
      nextProps.profile.idcard.Card.confirm === false
    ) {
      this.handleOpenModal();
    }
  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  fileChange = input => e => {
    // console.log(e.target.files[0])
    if (typeof e.target.files[0] !== "undefined") {
      let file = e.target.files[0];
      let err = {};
      const types = ["image/png", "image/jpeg", "image/jpg"];
      const size = 1024000;
      // console.log(file.size);
      if (types.every(type => file.type !== type)) {
        err = { image: "ไฟล์ไม่รองรับ" };
        this.setState({
          ...this.state,
          errors: err
        });
        // this.validator.showMessages();
      } else {
        if (file.size <= size) {
          this.setState({
            [input]: file,
            statusTemp: true
          });
          this.handleUploadCard(e, input, file);
          // this.handleOpenModal();
        } else {
          err = { image: "รองรับขนาดไฟล์ไม่เกิน 1 MB" };
          // console.log(err);
          this.setState({
            ...this.state,
            errors: err
          });
          // this.validator.showMessages();
        }
      }
    }
  };

  handleUploadCard = (e, input, file) => {
    e.preventDefault();

    let currentImageName = "idcard-image-" + Date.now();

    let uploadImage = storage.ref(`idcard/${currentImageName}`).put(file);

    uploadImage.on(
      "state_changed",
      snapshot => {},
      error => {
        alert(error);
      },
      () => {
        storage
          .ref("idcard")
          .child(currentImageName)
          .getDownloadURL()
          .then(url => {
            if (input === "cardfiletemp") {
              this.setState({
                cardphoto: url
              });
            }
            if (input === "userfiletemp") {
              this.setState({
                userphoto: url
              });
            }
            if (this.state.cardphoto !== null && this.state.userphoto) {
              this.setState({
                statusTemp: false
              });
            }
          });
      }
    );
  };

  onSubmit = e => {
    e.preventDefault();

    const cardUser = {
      idCard: this.state.idCard,
      idCardURL: this.state.cardphoto,
      idCardPerson: this.state.userphoto,
      laser: this.state.laserno
    };

    this.props.addIDcard(cardUser);
  };

  handleOpenModal = () => this.setState({ modalOpen: true });

  render() {
    let cardfield;
    let userfield;

    if (this.state.cardfiletemp.name != null) {
      cardfield = (
        <Form.Field className="text-left">
          <Input iconPosition="left" disabled fluid>
            <Icon name="id card" />
            <input type="text" value={this.state.cardfiletemp.name} />
          </Input>
        </Form.Field>
      );
    }

    if (this.state.userfiletemp.name != null) {
      userfield = (
        <Form.Field className="text-left">
          <Input iconPosition="left" disabled fluid>
            <Icon name="photo" />
            <input type="text" value={this.state.userfiletemp.name} />
          </Input>
        </Form.Field>
      );
    }

    return (
      <Responsive>
        <NavMenu />
        <Container fluid>
          <Grid centered className="mb-4">
            <Grid.Column mobile={16} tablet={9} computer={9}>
              <Header className="mb-5 text-center" as="h3">
                <div>ยืนยันตัวตนของคุณก่อนที่จะเริ่มลงประกาศ</div>
              </Header>
              <Form>
                <Header as="h4">
                  <div>บัตรประชาชน</div>
                </Header>
                <div className="mb-2">
                  เพื่อทำการยืนยันตัวตนของคุณ
                  คุณสามารถดูตัวอย่างการอัปโหลดได้ที่นี่
                </div>

                <Form.Field className="text-left">
                  <Input
                    fluid
                    placeholder="เลขบัตรประชาชน (ไม่ต้องเติมขีดหรือเว้นว่าง)"
                  >
                    <input
                      type="text"
                      maxLength="13"
                      className="form-control"
                      onChange={this.handleChange("idCard")}
                      value={this.state.idCard}
                    />
                  </Input>
                </Form.Field>

                <Form.Field className="text-left">
                  <Input
                    fluid
                    placeholder="เลขหลังบัตรประชาชน (ไม่ต้องเติมขีดหรือเว้นว่าง)"
                  >
                    <input
                      type="text"
                      maxLength="12"
                      className="form-control"
                      onChange={this.handleChange("laserno")}
                      value={this.state.laserno}
                    />
                  </Input>
                </Form.Field>

                {cardfield}

                {userfield}

                <Form.Group widths="equal">
                  <Form.Field className="text-center">
                    <Button
                      fluid
                      className="btn-paku-light mb-3"
                      content=""
                      onClick={() => this.fileInputRef1.current.click()}
                    >
                      <Button.Content visible>
                        อัปโหลดภาพบัตรประชาชน
                      </Button.Content>
                    </Button>
                    <input
                      ref={this.fileInputRef1}
                      type="file"
                      hidden
                      onChange={this.fileChange("cardfiletemp")}
                    />
                  </Form.Field>
                  <Form.Field className="text-center">
                    <Button
                      fluid
                      className="btn-paku-light mb-3"
                      content=""
                      onClick={() => this.fileInputRef2.current.click()}
                    >
                      <Button.Content visible>
                        อัปโหลดภาพคุณกับบัตรประชาชน
                      </Button.Content>
                    </Button>
                    <input
                      ref={this.fileInputRef2}
                      type="file"
                      hidden
                      onChange={this.fileChange("userfiletemp")}
                    />
                  </Form.Field>
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button
                    onClick={this.onSubmit}
                    disabled={this.state.statusTemp}
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
                <div>
                  <p>{this.state.errors.idCard}</p>
                  <p>{this.state.errors.idCardImage}</p>
                  <p>{this.state.errors.idCardPerson}</p>
                </div>
              </Form>

              <Modal
                open={this.state.modalOpen}
                className="modal-paku"
                size="tiny"
              >
                <Modal.Content>
                  ทีมงานกำลังตรวจสอบการยืนยันบัตรประชาชนของคุณ โปรดรอ 1 - 2
                  วันทำการ
                </Modal.Content>
                <Modal.Actions>
                  <Button className="btn-paku" href="/">
                    <text>กลับสู่หน้าแรก</text>
                  </Button>
                </Modal.Actions>
              </Modal>
            </Grid.Column>
          </Grid>
        </Container>
        <Footer />
      </Responsive>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addIDcard, getIDcard })(
  withRouter(ConfirmCard)
);
