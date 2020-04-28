import React, { Component } from "react";
import SimpleReactValidator from "simple-react-validator";
import {
  Grid,
  Form,
  Responsive,
  Container,
  Button,
  Icon,
  Header,
  Label,
  Image,
  Transition,
} from "semantic-ui-react";
import NavMenu from "../../NavMenu";
import Footer from "../../Footer";

class PostFormStep3 extends Component {
  constructor(props) {
    super(props);

    this.validator = new SimpleReactValidator({
      validators: {
        thai: {
          // name the rule
          message: ":attribute ภาษาไทย",
          rule: (val, params, validator) => {
            return validator.helpers.testRegex(val, /^[ก-์]*$/i);
          },
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
        alpha_num: "โปรดระบุเฉพาะตัวอักษรหรือตัวเลขเท่านั้น",
        integer: "โปรดระบุเฉพาะตัวเลขเท่านั้น",
        string: "โปรดระบุเฉพาะตัวอักษรเท่านั้น",
      },
    });
  }

  fileInputRef = React.createRef();

  continue = (e) => {
    e.preventDefault();
    this.props.nextStep(e);
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  setPrice = (input) => (e) => {
    e.preventDefault();
    this.props.setPrice(input);
  };

  fileChange = (e) => {
    e.preventDefault();
    this.props.fileChange(e);
  };

  removeFile = (index) => (e) => {
    e.preventDefault();
    this.props.removeFile(index);
  };

  render() {
    const { values, handleChange } = this.props;
    let button;

    if (values.preview.length <= 2) {
      button = (
        <div className="img-center-square-btn">
          <Image
            src="https://react.semantic-ui.com/images/wireframe/image.png"
            wrapped
            ui={false}
            onClick={() => this.fileInputRef.current.click()}
          />
          <input
            ref={this.fileInputRef}
            type="file"
            hidden
            onChange={this.fileChange}
          />
        </div>
      );
    }

    return (
      <Responsive>
        <NavMenu />
        <Container fluid>
          <Grid className="mb-4">
            <Grid.Column
              className="text-left pr-auto"
              mobile={16}
              tablet={8}
              computer={6}
              widescreen={5}
            >
              <Button onClick={this.back} className="btn-paku" color="yellow">
                <Button.Content>
                  <Icon name="arrow left" />
                </Button.Content>
              </Button>
              <Header as="h3">
                <div>ลงประกาศที่จอดรถในขั้นตอนสุดท้าย</div>
              </Header>
              <Header as="h6">
                <div>ขั้นตอนที่ 3</div>
              </Header>
              <Form>
                <Header as="h3">
                  <div>เพิ่มราคาที่จอดรถของคุณ</div>
                </Header>
                <Header as="h6">
                  <div>ราคาแนะนำ</div>
                </Header>
                <Label
                  as="a"
                  basic
                  className="mb-2"
                  onClick={this.setPrice("80")}
                >
                  ฿ 80
                </Label>
                <Label
                  as="a"
                  basic
                  className="mb-2"
                  onClick={this.setPrice("100")}
                >
                  ฿ 100
                </Label>
                <Form.Input
                  className="mt-1 mb-0"
                  fluid
                  placeholder="กรุณากรอกราคาที่คุณต้องการ (เฉพาะตัวเลข)"
                  onChange={handleChange("price")}
                  value={values.price}
                />
                {this.validator.message(
                  "คำอธิบายที่จอดรถ",
                  values.price,
                  "required|integer"
                )}

                <Header as="h4">
                  <div>เพิ่มรูปภาพที่จอดรถของคุณ (อย่างน้อย 1 รูป)</div>
                </Header>
                <Form.Group widths={3}>
                  {values.preview.map((preview, index) => {
                    return (
                      <div key={index} className="button-floated">
                        <div className="img-center-square">
                          <Image src={preview} wrapped ui={false} />
                        </div>
                        <Button
                          as="a"
                          circular
                          icon="times"
                          onClick={this.removeFile(index)}
                        />
                      </div>
                    );
                  })}
                  {button}
                </Form.Group>

                <Button
                  onClick={this.continue}
                  disabled={
                    this.props.values.statustemp || values.preview.length === 0
                  }
                  className="btn-paku"
                  color="yellow"
                  animated
                >
                  <Button.Content visible>ประกาศ</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
              </Form>
            </Grid.Column>
          </Grid>
        </Container>
        <Footer />
      </Responsive>
    );
  }
}

export default PostFormStep3;
