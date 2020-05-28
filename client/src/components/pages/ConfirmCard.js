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
  Input,
  List,
  Image,
  Transition,
  Label,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { storage } from "../../config/firebase-config";
import { addIDcard, getIDcard } from "../../redux/actions/profileActions";
import SimpleReactValidator from "simple-react-validator";
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
      modalExampleOpen: false,
      statusTemp: true,
      errors: {},
    };

    this.validator = new SimpleReactValidator({
      validators: {
        imgerror: {
          // name the rule
          message: ":values",
          rule: (val, params, validator) => params === null,
          messageReplace: (message, params) =>
            message.replace(":values", params), // optional
        },
      },
      element: (message) => (
        <div className="mb-2">
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
        min: ":attributeต้องมีความยาว :min ตัวอักษร",
        alpha_num: "โปรดระบุเฉพาะตัวอักษรหรือตัวเลขเท่านั้น",
        integer: "โปรดระบุเฉพาะตัวเลขเท่านั้น",
      },
    });
  }

  fileInputRef1 = React.createRef();
  fileInputRef2 = React.createRef();

  componentDidMount = () => {
    document.title = "Paku - Confirm ID Card";
    this.props.getIDcard();
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.idcard != null)
      if (nextProps.profile.idcard.Card.confirm === true) {
        this.props.history.push("/");
      } else if (
        nextProps.profile.idcard.Card.idCard !== 0 &&
        nextProps.profile.idcard.Card.confirm === false
      ) {
        this.handleOpenModal();
      }
  };

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  fileChange = (input) => (e) => {
    // console.log(e.target.files[0])
    if (typeof e.target.files[0] !== "undefined") {
      let file = e.target.files[0];
      let err = {};
      const types = ["image/png", "image/jpeg", "image/jpg"];
      const size = 1024000;
      // console.log(file.size);
      if (types.every((type) => file.type !== type)) {
        err = { image: "ไฟล์ไม่รองรับ" };
        this.setState({
          ...this.state,
          errors: err,
        });
        this.validator.showMessages();
      } else {
        if (file.size <= size) {
          this.setState({
            [input]: file,
            statusTemp: true,
          });
          this.handleUploadCard(e, input, file);
          // this.handleOpenModal();
        } else {
          err = { image: "รองรับขนาดไฟล์ไม่เกิน 1 MB" };
          // console.log(err);
          this.setState({
            ...this.state,
            errors: err,
          });
          this.validator.showMessages();
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
      (snapshot) => {},
      (error) => {
        alert(error);
      },
      () => {
        storage
          .ref("idcard")
          .child(currentImageName)
          .getDownloadURL()
          .then((url) => {
            if (input === "cardfiletemp") {
              this.setState({
                cardphoto: url,
              });
            }
            if (input === "userfiletemp") {
              this.setState({
                userphoto: url,
              });
            }
            if (this.state.cardphoto !== null && this.state.userphoto) {
              this.setState({
                statusTemp: false,
              });
            }
          });
      }
    );
  };

  onSubmit = (e) => {
    if (
      this.validator.fieldValid("เลขบัตรประชาชน") &&
      this.validator.fieldValid("เลขหลังบัตรประชาชน")
    ) {
      e.preventDefault();
      const cardUser = {
        idCard: this.state.idCard,
        idCardURL: this.state.cardphoto,
        idCardPerson: this.state.userphoto,
        laser: this.state.laserno,
      };
      this.props.addIDcard(cardUser);
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  };

  handleOpenModal = () => this.setState({ modalOpen: true });

  handleOpenExampleModal = () => this.setState({ modalExampleOpen: true });

  handleCloseExampleModal = () => this.setState({ modalExampleOpen: false });

  render() {
    let errors = this.state.errors;
    let cardfield;
    let userfield;

    if (this.state.cardfiletemp.name != null) {
      cardfield = (
        <Form.Field className="text-left mt-3 mb-0">
          <Input iconPosition="left" disabled fluid>
            <Icon name="id card" />
            <input type="text" value={this.state.cardfiletemp.name} />
          </Input>
        </Form.Field>
      );
    }

    if (this.state.userfiletemp.name != null) {
      userfield = (
        <Form.Field className="text-left mt-3 mb-0">
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
            <Grid.Column mobile={16} tablet={8} computer={6} widescreen={5}>
              <Header className="mb-5 text-center" as="h3">
                <div>ยืนยันตัวตนของคุณก่อนที่จะเริ่มลงประกาศ</div>
              </Header>
              <Form>
                <Header as="h4">
                  <div>บัตรประชาชน</div>
                </Header>
                <span className="mb-2">
                  เพื่อทำการยืนยันตัวตนของคุณ คุณสามารถดูตัวอย่างการอัปโหลดได้
                  <text
                    className="ButtonLink"
                    onClick={this.handleOpenExampleModal}
                  >
                    ที่นี่
                  </text>
                </span>

                <Form.Field className="text-left mt-3 mb-0">
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
                {this.validator.message(
                  "เลขบัตรประชาชน",
                  this.state.idCard,
                  "required|integer|min:13,string"
                )}

                <Form.Field className="text-left mt-3 mb-0">
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
                {this.validator.message(
                  "เลขหลังบัตรประชาชน",
                  this.state.laserno,
                  "required|alpha_num|min:12"
                )}

                {cardfield}

                {userfield}

                <Form.Group widths="equal">
                  <Form.Field className="text-center mt-3 mb-0">
                    <Button
                      fluid
                      className="btn-paku-light"
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
                  <Form.Field className="text-center mt-3 mb-0">
                    <Button
                      fluid
                      className="btn-paku-light"
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

                {this.validator.message(
                  "err",
                  errors.image,
                  `imgerror:${errors.image}`
                )}

                <div className="mt-3 d-flex justify-content-end">
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

        <Modal
          open={this.state.modalExampleOpen}
          onClose={this.handleCloseExampleModal}
          className="modal-paku"
        >
          <Header icon="photo" content="ตัวอย่างการอัปโหลด" />
          <Modal.Content>
            <Modal.Description>
              <List
                as="ol"
                style={{
                  "margin-left": "1.5rem",
                  "margin-right": "1.5rem",
                }}
              >
                <List.Item>
                  <List.Content>
                    <List.Header>
                      <div>ให้เช่าที่จอดรถยามต้องการ</div>
                    </List.Header>
                    <List.Description
                      className="mt-2"
                      style={{
                        "line-height": "normal",
                      }}
                    >
                      &nbsp;&nbsp;การยืนยันตัวตน
                      จะต้องใช้รูปจากบัตรประจำตัวที่รัฐบาลออกให้เท่านั้น เช่น
                      บัตรประชาชน ใบขับขี่ หนังสือเดินทาง
                      <br />
                      &nbsp;&nbsp;รูปภาพที่อัพโหลด สามารถถ่ายด้วยกล้องโทรศัพท์
                      แท็บเล็ต คอมพิวเตอร์
                      หรือจะเป็นไฟล์ที่มีอยู่ในคอมพิวเตอร์ก็ได้
                      <br />
                      &nbsp;&nbsp;โดยคุณจะต้องยืนยันตัวตนด้วยรูปภาพ ดังนี้
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;1.
                      คุณจะต้องถ่ายรูปบัตรประจำตัวด้านหน้า แล้วกดอัปโหลดไฟล์
                      <Image
                        className="mt-3"
                        centered
                        as="img"
                        src={require("../imgs/example-front.png")}
                        size="medium"
                      />
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;2.
                      คุณจะต้องถ่ายรูปคุณคู่กับบัตรประจำตัว แล้วกดอัปโหลดไฟล์
                      <Image
                        className="mt-3"
                        centered
                        as="img"
                        src={require("../imgs/example-card.png")}
                        size="medium"
                      />
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;การดำเนินการด้วยขั้นตอนเหล่านี้ไม่ใช่การรับรอง
                      เจ้าของที่จอดรถ หรือ ผู้เช่าที่จอดรถ
                      ไม่ใช่การรับประกันตัวบุคคล
                      ว่าการติดต่อสื่อสารกับบุคคลนั้นจะปลอดภัย
                      โปรดใช้วิจารณญาณอย่างดีที่สุด
                      และปฏิบัติตามเคล็ดลับความปลอดภัยสำหรับเจ้าของที่จอดรถ
                      และผู้เช่าที่จอดรถเสมอ
                      <br /> ด้วยความปราถนาดีจาก PAKU
                    </List.Description>
                  </List.Content>
                </List.Item>
              </List>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={this.handleCloseExampleModal}
              className="btn-paku"
              color="yellow"
            >
              <div>
                ปิด <Icon name="right chevron" />
              </div>
            </Button>
          </Modal.Actions>
        </Modal>

        <Footer />
      </Responsive>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { addIDcard, getIDcard })(
  withRouter(ConfirmCard)
);
