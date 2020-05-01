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
  Transition,
  Label,
} from "semantic-ui-react";
import NavMenu from "../../NavMenu";
import Footer from "../../Footer";

class PostFormStep2 extends Component {
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

  addRule = (e) => {
    e.preventDefault();
    this.props.handleAddRule();
  };

  addNearby = (e) => {
    e.preventDefault();
    this.props.handleAddNearby();
  };

  deleteRuleItem = (index) => (e) => {
    e.preventDefault();
    this.props.deleteRuleItem(index);
  };

  deleteNearbyItem = (index) => (e) => {
    e.preventDefault();
    this.props.deleteNearbyItem(index);
  };

  handleFacility = (facility) => (e) => {
    e.preventDefault();
    this.props.handleFacility(facility);
  };

  continue = (e) => {
    if (this.validator.allValid()) {
      e.preventDefault();
      this.props.nextStep();
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;

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
                <div>มาเริ่มลงประกาศที่จอดรถกันต่อ</div>
              </Header>
              <Header as="h6">
                <div>ขั้นตอนที่ 2</div>
              </Header>
              <Form>
                <Header as="h3">
                  <div>คำอธิบายที่จอดรถของคุณ</div>
                </Header>
                <Form.TextArea
                  className="mt-3 mb-0"
                  fluid
                  placeholder="อธิบายที่จอดรถของคุณให้ผู้จองได้รู้"
                  onChange={handleChange("explain")}
                  value={values.explain}
                />
                {this.validator.message(
                  "คำอธิบายที่จอดรถ",
                  values.explain,
                  "required"
                )}

                <Header as="h4">
                  <div>กฎที่จอดรถ</div>
                </Header>
                <Header as="h6">
                  <div>
                    เพิ่มกฎของคุณให้ผู้เช่าได้รู้
                    และสร้างความสบายใจให้กับทั้งสองฝ่าย
                  </div>
                </Header>
                {values.rule.map((rule, index) => {
                  return (
                    <Label className="mb-2 btn-paku-light" key={index}>
                      {rule}
                      <Icon
                        name="delete"
                        onClick={this.deleteRuleItem(index)}
                      />
                    </Label>
                  );
                })}
                <Form.Group widths={2}>
                  <Form.Input
                    fluid
                    placeholder="เพิ่มกฎของคุณ (ไม่บังคับ)"
                    onChange={handleChange("addrule")}
                    value={values.addrule}
                  />
                  <Button
                    disabled={values.addrule.length === 0}
                    as="div"
                    className="btn-paku"
                    onClick={this.addRule}
                  >
                    <Button.Content>
                      <Icon name="plus" />
                      เพิ่มกฎ
                    </Button.Content>
                  </Button>
                </Form.Group>

                <Header as="h4">
                  <div>สถานที่ใกล้เคียงกับที่จอดรถ</div>
                </Header>
                {values.nearby.map((nearby, index) => {
                  return (
                    <Label className="mb-2 btn-paku-light" key={index}>
                      {nearby}
                      <Icon
                        name="delete"
                        onClick={this.deleteNearbyItem(index)}
                      />
                    </Label>
                  );
                })}
                <Form.Group widths={2}>
                  <Form.Input
                    fluid
                    placeholder="ชื่อสถานที่ (ไม่บังคับ)"
                    onChange={handleChange("addnearby")}
                    value={values.addnearby}
                  />
                  <Button
                    disabled={values.addnearby.length === 0}
                    as="div"
                    className="btn-paku"
                    onClick={this.addNearby}
                  >
                    <Button.Content>
                      <Icon name="plus" />
                      เพิ่มสถานที่
                    </Button.Content>
                  </Button>
                </Form.Group>

                <Header as="h4">
                  <div>สิ่งอำนวยความสะดวก</div>
                </Header>
                <Form.Group inline>
                  {values.addfacility.map((facility) => {
                    return (
                      <Form.Checkbox
                        key={facility.key}
                        label={facility.text}
                        checked={facility.checked}
                        value={facility.value}
                        onChange={handleChange("")}
                        onClick={this.handleFacility(facility)}
                      />
                    );
                  })}
                </Form.Group>

                <Button
                  onClick={this.continue}
                  className="btn-paku"
                  color="yellow"
                  animated
                >
                  <Button.Content visible>ถัดไป</Button.Content>
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

export default PostFormStep2;
