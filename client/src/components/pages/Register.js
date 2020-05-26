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
  Loader,
  List,
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
      errors: {},
    };

    this.onChange = this.onSubmit.bind(this);
    this.validator = new SimpleReactValidator({
      validators: {
        userror: {
          // name the rule
          message: "ชื่อผู้ใช้ซ้ำ",
          rule: (val) => val === null,
        },
        emerror: {
          // name the rule
          message: "อีเมลซ้ำ",
          rule: (val) => val === null,
        },
        thai: {
          // name the rule
          message: "โปรดระบุ:attributeเป็นภาษาไทย หรือภาษาอังกฤษ",
          rule: (val, params, validator) => {
            return validator.helpers.testRegex(val, /^[a-zA-Zก-๙]*$/i);
          },
        },
      },
      element: (message) => (
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
        max: ":attributeต้องมีความยาวตั้งแต่ 6 ถึง 30 ตัวอักษร",
      },
    });
  }

  componentDidMount() {
    document.title = "PAKU - Register";
    document.body.classList.add("Background-Brown");
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.status === 0) {
        this.props.history.push("/");
      } else if (this.props.auth.user.status === 1) {
        this.props.history.push("/admin");
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentWillUnmount() {
    document.body.classList.remove("Background-Brown");
  }

  onSubmit = (e) => {
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
        terms: this.state.terms,
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
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  state = {
    modalOpen: false,
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

              <Grid.Column mobile={16} tablet={7} computer={6} widescreen={5}>
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
                    <span className="align-middle">
                      &nbsp;ฉันยอมรับ
                      <text
                        className="ButtonLink"
                        onClick={this.handleOpenModal}
                      >
                        ข้อกำหนดและเงื่อนไขในการใช้งาน
                      </text>
                    </span>
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
                                &nbsp;&nbsp;สวัสดีและยินดีต้อนรับสู่
                                ข้อกำหนดและเงื่อนไขการใช้บริการของ PAKU
                                (“ข้อกำหนด”) โปรดอ่านข้อกำหนด
                                นโยบายความเป็นส่วนตัว และเงื่อนไขการใช้งาน
                                โดยละเอียดเพื่อประโยชน์ในการรับบริการจากเรา
                                <br />
                                <br />
                                &nbsp;&nbsp;การตกลงสมัครเข้าใช้บริการ
                                ถือว่าผู้ใช้บริการยอมรับว่าได้อ่านและทำความเข้าใจเงื่อนไขการใช้บริการและนโยบายความเป็นส่วนตัวโดยละเอียดถี่ถ้วนแล้ว
                                และผู้ใช้บริการ (“คุณ”)
                                ยอมรับเงื่อนไขการใช้บริการทุกประการและนโยบายความเป็นส่วนตัว
                                เงื่อนไขการใช้บริการฉบับนี้มีผลผูกพันผู้ใช้บริการตามกฎหมาย
                              </List.Description>
                              <List.List className="mt-3">
                                <List.Item
                                  as="li"
                                  style={{
                                    "line-height": "normal",
                                  }}
                                >
                                  <List.Content>
                                    <List.Header>
                                      <div>บทนำ</div>
                                    </List.Header>
                                    <List.Description>
                                      &nbsp;&nbsp;ขอขอบคุณที่เลือกใช้ PAKU
                                      (“PAKU”, “ผู้ให้บริการ”, “เรา”, “พวกเรา”,
                                      “ของเรา”) PAKU
                                      ให้บริการจองที่จอดรถสำหรับผู้ต้องการจองที่จอดรถและให้บริการสำหรับผู้ต้องการให้เช่าพื้นที่จอดรถสำหรับผู้ที่มีพื้นที่ปล่อยให้เช่าเป็นที่จอดรถ
                                      (เรียกรวมว่า “ผู้ใช้บริการ”)
                                      รวมถึงผลิตภัณฑ์และการบริการอื่น ๆ
                                      ที่อาจมีการพัฒนาเป็นครั้งคราว
                                      ในการตกลงสมัครเข้าใช้บริการ
                                      หรืออีกนัยหนึ่งคือ การใช้บริการใด ๆ
                                      เหล่านี้ของ PAKU
                                      รวมถึงคุณลักษณะและฟังก์ชันการทำงาน
                                      เว็บไซต์และอินเทอร์เฟซผู้ใช้
                                      เช่นเดียวกันกับเนื้อหาและแอปพลิเคชันซอฟต์แวร์ทั้งหมดที่สัมพันธ์กับการบริการของเรา
                                      (เรียกรวมว่า “การบริการของ PAKU”หรือ
                                      “การบริการ”)
                                      คุณกำลังทำสัญญาซึ่งมีผลผูกพันผู้ใช้บริการตามกฎหมาย
                                      <br />
                                      <br />
                                      &nbsp;&nbsp;การใช้บริการของเรานั้น
                                      ผู้ใช้บริการต้องเข้าใจและยอมรับข้อตกลง
                                      เงื่อนไขการใช้บริการ
                                      และนโยบายความเป็นส่วนตัวต่าง ๆ
                                      ของเราทั้งหมดก่อน
                                      <br />
                                      <br />
                                      &nbsp;&nbsp;การสมัครเข้าใช้บริการ
                                      การยอมรับข้อตกลง เงื่อนไขการใช้บริการ
                                      และนโยบายความเป็นส่วนตัวต่าง ๆ
                                      ถือว่าผู้ใช้บริการยอมรับได้ว่า
                                      อ่านและเข้าใจพร้อมทั้งตกลงยินยอมตามข้อตกลง
                                      เงื่อนไขการใช้บริการ
                                      นโยบายความเป็นส่วนตัวและหรือข้อบังคับอื่นใดแล้วแต่กรณี
                                      <br />
                                      <br />
                                      &nbsp;&nbsp;ในการใช้บริการของ PAKU คุณต้อง
                                      <br />
                                      &nbsp;&nbsp;1.1
                                      มีอายุถึงตามข้อกำหนดด้านอายุดังนี้
                                      <br />
                                      &nbsp;&nbsp;&nbsp;&nbsp;1.1.1
                                      ในส่วนของผู้จองที่จอดรถต้องมีอายุตั้งแต่
                                      18 ปีขึ้นไป
                                      <br />
                                      &nbsp;&nbsp;&nbsp;&nbsp;1.1.2
                                      ในส่วนของผู้ให้เช่าพื้นที่จอดรถต้องมีอายุตั้งแต่
                                      20 ปีขึ้นไป
                                      <br />
                                      &nbsp;&nbsp;1.2
                                      พักอาศัยภายในราชอาณาจักรไทย
                                      และคุณยังให้สัญญาว่า
                                      ข้อมูลที่ได้ลงทะเบียนไว้กับ PAKU
                                      เป็นความจริง ถูกต้อง และครบถ้วน
                                      คุณยอมรับที่จะรักษาข้อมูลให้เป็นเช่นนั้นตลอดเวลาอีกด้วย
                                      และเพื่อประโยชน์ในการให้บริการในบางกรณีผู้ให้บริการ
                                      อาจร้องขอเอกสารเพิ่มเติมเพื่อยืนยันข้อมูลต่าง
                                      ๆ
                                      และผู้ใช้บริการยอมรับที่ต้องปฏิบัติตามคำร้องขอ
                                    </List.Description>
                                  </List.Content>
                                </List.Item>
                                <List.Item
                                  className="mt-3"
                                  as="li"
                                  style={{
                                    "line-height": "normal",
                                  }}
                                >
                                  <List.Content>
                                    <List.Header>
                                      <div>การเปลี่ยนแปลงข้อตกลง</div>
                                    </List.Header>
                                    <List.Description>
                                      &nbsp;&nbsp;ผู้ให้บริการอาจทำการเปลี่ยนแปลงข้อตกลงตามเหตุอันสมควรเป็นครั้งคราว
                                      หรือเพิ่มฟังก์ชันหรือคุณลักษณะ
                                      และการปรับตั้งค่าทางเทคนิคอันมีเหตุสมควรแก่การให้บริการ
                                      ตรวจสอบการทำงาน
                                      หรือความปลอดภัยของการให้บริการ
                                      และด้วยเหตุผลทางกฎหมายหรือข้อบังคับ
                                      เมื่อเราทำการเปลี่ยนแปลงเนื้อหาในข้อตกลง
                                      เราจะทำการแจ้งให้คุณทราบตามความเหมาะสมของสถานการณ์
                                      ยกตัวอย่างเช่น
                                      แจ้งโดยการแสดงข้อความที่มองเห็นได้ชัดเจน
                                      หรือแจ้งโดยการส่งอีเมล
                                      <br />
                                      <br />
                                      &nbsp;&nbsp;ผู้ใช้บริการต้องเข้าใจและยอมรับข้อตกลงและเงื่อนไขต่าง
                                      ๆ
                                      ของผู้ให้บริการที่ได้มีการเปลี่ยนแปลงแล้ว
                                      หากผู้ใช้บริการเข้าใช้บริการหลังมีการเปลี่ยนแปลง
                                    </List.Description>
                                  </List.Content>
                                </List.Item>
                                <List.Item
                                  className="mt-3"
                                  as="li"
                                  style={{
                                    "line-height": "normal",
                                  }}
                                >
                                  <List.Content>
                                    <List.Header>
                                      <div>การรักษาข้อมูลส่วนบุคคล</div>
                                    </List.Header>
                                    <List.Description>
                                      &nbsp;&nbsp;ข้อมูลส่วนบุคคลของผู้ใช้บริการ
                                      จะไม่เปิดเผยความลับหรือข้อมูลส่วนบุคคลของท่านให้แก่บุคคลภายนอกหรือองค์กรอื่นใดไม่ว่าเพื่อวัตถุประสงค์ใด
                                      ๆ เว้นแต่
                                      <br />
                                      &nbsp;&nbsp;3.1
                                      ได้รับความยินยอมจากผู้ใช้บริการ
                                      <br />
                                      &nbsp;&nbsp;&nbsp;&nbsp;3.1.1
                                      ในส่วนของผู้ใช้บริการจะมมีการแสดงข้อมูลบางส่วน
                                      เช่น เบอร์โทร ชื่อ เป็นต้น
                                      เพื่อใช้ในการติดต่อ
                                      <br />
                                      &nbsp;&nbsp;3.2 กระทำการตามที่กฎหมายบังคับ
                                      และหรือตามคำสั่งหรือหมายของศาล เป็นต้น
                                      <br />
                                      &nbsp;&nbsp;3.3 เป็นไปตาม
                                      นโยบายความเป็นส่วนตัว
                                      <br />
                                      &nbsp;&nbsp;3.4
                                      ในส่วนของผู้ให้เช่าพื้นที่จอดรถจำเป็นต้องมีการเปิดเผยข้อมูลบางส่วน
                                      เช่น เบอร์ติดต่อ เป็นต้น
                                      เพื่อให้ผู้จองที่จอดรถสามารถติดต่อได้สะดวกมากยิ่งขึ้น
                                    </List.Description>
                                  </List.Content>
                                </List.Item>
                                <List.Item
                                  className="mt-3"
                                  as="li"
                                  style={{
                                    "line-height": "normal",
                                  }}
                                >
                                  <List.Content>
                                    <List.Header>
                                      <div>ลิขสิทธิ์ของผู้ให้บริการ</div>
                                    </List.Header>
                                    <List.Description>
                                      &nbsp;&nbsp;ผู้ให้บริการ มีซึ่งสิทธิ
                                      ลิขสิทธิ์
                                      และทรัพย์สินทางปัญญาในข้อมูลที่แสดง รูปภาพ
                                      และ รูปแบบการแสดงผล
                                      ตามที่ปรากฏในเว็บไซต์ทั้งหมด
                                      ยกเว้นจะมีการระบุอย่างชัดเจนเป็นอื่น
                                      ห้ามมิให้ผู้ใดทำการคัดลอก ทำซ้ำ มีสำเนา
                                      สำรองไว้ ทำเลียนแบบ ทำเหมือน ดัดแปลง
                                      ทำเพิ่ม
                                      เพื่อนำไปเผยแพร่ด้วยวัตถุประสงค์อื่นใด
                                      โดยปราศจากความยินยอมเป็นหนังสือจากผู้ให้บริการ
                                      ทั้งนี้เว้นแต่จะได้มีการระบุกำหนดไว้ในข้อตกลง
                                      เงื่อนไขการใช้บริการ
                                      และนโยบายความเป็นส่วนตัว ๆ เว้นแต่
                                    </List.Description>
                                  </List.Content>
                                </List.Item>
                                <List.Item
                                  className="mt-3"
                                  as="li"
                                  style={{
                                    "line-height": "normal",
                                  }}
                                >
                                  <List.Content>
                                    <List.Header>
                                      <div>สิทธิของผู้ให้บริการ</div>
                                    </List.Header>
                                    <List.Description>
                                      &nbsp;&nbsp;ผู้ให้บริการ สามารถนำข้อมูลใด
                                      ๆ ก็ตามที่ผู้ใช้บริการให้กับผู้ให้บริการ
                                      โดยผ่าน PAKU ไปใช้ในการวิจัย วิเคราะห์
                                      แยกแยะ และหรืออื่นใด ตามที่เห็นสมควร
                                      โดยมิต้องแจ้งให้ทราบล่วงหน้า
                                      ต้องเป็นข้อมูลที่ผู้ใช้บริการยินยอมให้ใช้ตามข้อตกลง
                                      เงื่อนไขการใช้บริการ
                                      และนโยบายความเป็นส่วนตัว
                                    </List.Description>
                                  </List.Content>
                                </List.Item>
                                <List.Item
                                  className="mt-3"
                                  as="li"
                                  style={{
                                    "line-height": "normal",
                                  }}
                                >
                                  <List.Content>
                                    <List.Header>
                                      <div>การระงับการให้บริการ</div>
                                    </List.Header>
                                    <List.Description>
                                      &nbsp;&nbsp;ผู้ให้บริการ
                                      สามารถระงับการใช้บริการแก่ผู้ใช้บริการใด ๆ
                                      ตามเห็นสมควรได้
                                      ถึงแม้ว่าผู้ใช้บริการจะไม่ได้ละเมิดข้อตกลง
                                      เงื่อนไขการใช้การบริการ
                                      และนโยบายความเป็นส่วนตัวใด ๆ ก็ตาม
                                      และผู้ใช้บริการไม่สามารถเรียกร้องค่าเสียหายอื่น
                                      ๆ จากผู้ให้บริการได้
                                      <br />
                                      &nbsp;&nbsp;ผู้ให้บริการ
                                      อาจระงับการให้บริการเป็นการชั่วคราว
                                      ด้วยเหตุจำเป็นบางประการ และถือว่า
                                      ผู้ให้บริการไม่มีความรับผิดในการระงับบริการดังกล่าวไม่ว่าประการใด
                                      ซึ่งรวมถึงข้อบกพร่องที่ไม่สามารถคาดการณ์ได้ล่วงหน้า
                                      อันอาจจะเกิดจุดบกพร่องของอุปกรณ์ ซอฟต์แวร์
                                      หรือสิ่งอื่นใดที่มีผลกระทบต่อการใช้บริการและให้บริการ
                                    </List.Description>
                                  </List.Content>
                                </List.Item>
                                <List.Item
                                  className="mt-3"
                                  as="li"
                                  style={{
                                    "line-height": "normal",
                                  }}
                                >
                                  <List.Content>
                                    <List.Header>
                                      <div>ข้อกำหนดของพวกเรา</div>
                                    </List.Header>
                                    <List.Description>
                                      &nbsp;&nbsp;ผู้ให้บริการ
                                      ขอแจ้งให้ทราบและเข้าใจ ดังนี้
                                      <br />
                                      &nbsp;&nbsp;7.1
                                      ผู้ให้บริการไม่รับผิดชอบต่อความเสียหายใดๆก็ตามที่เกิดจากการใช้บริการ
                                      หรือเกิดจากความบกพร่องของผู้ใช้บริการ
                                      <br />
                                      &nbsp;&nbsp;7.2
                                      หากความเสียหายใดๆก็ตามที่ผู้ใช้บริการกระทำการ
                                      หรือจงใจกระทำการ
                                      หรือพยายามกระทำการไม่ว่าจะทางตรงหรือทางอ้อม
                                      อันจะทำให้ผู้ใช้บริการท่านอื่นหรือบุคคลอื่นใดก็ตามได้รับความเสียหาย
                                      เสียชื่อเสียง หรือสิ่งใด
                                      ให้ผู้ใช้บริการท่านนั้น ๆ
                                      เป็นผู้รับผิดชอบแต่เพียงผู้เดียว
                                      ผู้ให้บริการจะไม่มีส่วนรับผิดชอบใด ๆ
                                      ทั้งสิ้น
                                      <br />
                                      &nbsp;&nbsp;7.3
                                      หากความเสียหายใดๆก็ตามที่ผู้ใช้บริการกระทำการ
                                      หรือจงใจกระทำการ
                                      หรือพยายามกระทำการไม่ว่าจะทางตรงหรือทางอ้อม
                                      อันจะทำให้ผู้ให้บริการได้รับความเสียหาย
                                      เสียชื่อเสียง หรือสิ่งใด
                                      ผู้ให้บริการมีสิทธิเรียกร้องค่าเสียหาย
                                      หรือฟ้องร้องดำเนินคดีตามกฎหมายได้
                                      <br />
                                      &nbsp;&nbsp;7.4 ข้อกำหนด ข้อตกลง สัญญา
                                      หรือข้อความใดในเงื่อนไขการใช้บริการนี้
                                      หากเป็นโมฆะหรือโมฆียะให้เป็นไปตามกฎหมายของไทยเท่านั้น
                                      ทั้งนี้ให้ยกเว้นส่วนที่ไม่ได้เป็นโมฆะหรือโมฆียะให้ใช้บังคับต่อไป
                                      <br />
                                      &nbsp;&nbsp;7.5 กรณีที่ข้อความใด ๆ
                                      มีความขัดหรือแย้งกัน
                                      ในฉบับภาษาไทยและฉบับแปลภาษาอื่นๆ
                                      ให้ถือตามฉบับภาษาไทยมีผลเหนือฉบับแปลภาษาอื่น
                                      ๆ
                                      <br />
                                      &nbsp;&nbsp;7.6
                                      การกระทำใดๆก็ตามที่มีผลต่อการใช้บริการของผู้ให้บริการและผู้ใช้บริการ
                                      ให้อยู่ภายใต้การบังคับของกฎหมายไทยเท่านั้น
                                      โดยไม่คำนึงถึงสถานที่ตั้งของระบบ ข้อมูล
                                      และการใช้งาน
                                      รวมถึงกฎหรือบทบัญญัติว่าด้วยการเลือกกฎหมายหรือการขัดกันของกฎหมาย
                                      และให้ศาลในราชอาณาจักรไทยเป็นศาลที่มีเขตอำนาจในการพิจารณาชี้ขาดตัดสินข้อพิพาทที่เกิดขึ้นภายใต้
                                      ข้อตกลง เงื่อนไขการใช้บริการ
                                      และนโยบายความเป็นส่วนตัว
                                    </List.Description>
                                  </List.Content>
                                </List.Item>
                              </List.List>
                            </List.Content>
                          </List.Item>
                        </List>
                      </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button
                        onClick={this.handleCloseModal}
                        className="btn-paku"
                        color="yellow"
                      >
                        <div>
                          ปิด <Icon name="right chevron" />
                        </div>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
