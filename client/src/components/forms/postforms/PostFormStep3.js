import React, { Component } from 'react';
import { Grid, Form, Responsive, Container, Button, Icon } from 'semantic-ui-react';

class PostFormStep3 extends Component {

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <Responsive>
        <Container fluid>
          <Grid className='mb-4'>
            <Grid.Column className='text-left pr-auto' mobile={16} tablet={8} computer={8}>
              <Button onClick={this.back} className='btn-paku' color='yellow'>
                <Button.Content>
                  <Icon name='arrow left' />
                </Button.Content>
              </Button>
              <h4 className="mb-3">ลงประกาศที่จอดรถในขั้นตอนสุดท้าย</h4>
              <h6 className="mb-4">ขั้นตอนที่ 3</h6>
              <Form>
                <text>เพิ่มราคาที่จอดรถของคุณ</text>
                <Form.Input
                  fluid
                  placeholder='กรุณากรอกราคาที่คุณต้องการ (เฉพาะตัวเลข)'
                  onChange={handleChange('price')}
                  value={values.price}
                />

                <h5 className="mb-4">เพิ่มรูปภาพที่จอดรถของคุณ</h5>
                <Form.Input
                  fluid
                />

                <Button onClick={this.continue} className='btn-paku' color='yellow' animated>
                  <Button.Content visible>ประกาศ</Button.Content>
                  <Button.Content hidden>
                    <Icon name='arrow right' />
                  </Button.Content>
                </Button>

              </Form>
            </Grid.Column>
          </Grid>
        </Container>
      </Responsive>
    );
  }
}

export default PostFormStep3;