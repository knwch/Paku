import React, { Component } from 'react';
import { Grid, Form, Responsive, Container, Button, Icon, Header } from 'semantic-ui-react';

class PostFormStep3 extends Component {

  continue = e => {
    e.preventDefault();
    this.props.nextStep(e);
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
              <Header as='h3'><div>ลงประกาศที่จอดรถในขั้นตอนสุดท้าย</div></Header>
              <Header as='h6'><div>ขั้นตอนที่ 3</div></Header>
              <Form>
                <Header as='h3'><div>เพิ่มราคาที่จอดรถของคุณ</div></Header>
                <Form.Input
                  fluid
                  placeholder='กรุณากรอกราคาที่คุณต้องการ (เฉพาะตัวเลข)'
                  onChange={handleChange('price')}
                  value={values.price}
                />

                <Header as='h4'><div>เพิ่มรูปภาพที่จอดรถของคุณ</div></Header>
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