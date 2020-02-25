import React, { Component } from 'react';
import { Grid, Form, Responsive, Container, Button, Icon } from 'semantic-ui-react';

class PostFormStep2 extends Component {

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
              <h4 className="mb-3">ลงประกาศที่จอดรถ</h4>
              <h6 className="mb-4">ขั้นตอนที่ 2</h6>
              <Form>
                <text>คำอธิบายที่จอดรถของคุณ</text>
                <Form.TextArea
                  fluid
                  placeholder='อธิบายที่จอดรถของคุณให้ผู้จองได้รู้'
                  onChange={handleChange('detail')}
                  value={values.detail}
                />

                <h5 className="mb-4">กฎที่จอดรถ</h5>
                <text>เพิ่มกฎของคุณให้ผู้เช่าได้รู้ และสร้างความสบายใจให้กับทั้งสองฝ่าย</text>
                <Form.Input
                  fluid
                  placeholder='เพิ่มกฎของคุณ (ไม่บังคับ)'
                  onChange={handleChange('rule')}
                  value={values.rule}
                />
                <Form.Input
                  fluid
                  placeholder='ชื่อสถานที่'
                  onChange={handleChange('nearby')}
                  value={values.nearby}
                />

                <text>สิ่งอำนวยความสะดวก</text>
                <Form.Group inline>
                  <Form.Radio
                    label='CCTV'
                    checked={values.facility === 'cctv'}
                    onChange={handleChange('facility')}
                    value='cctv'
                  />
                  <Form.Radio
                    label='ห้องน้ำ'
                    checked={values.facility === 'toilet'}
                    onChange={handleChange('facility')}
                    value='toilet'
                  />
                  <Form.Radio
                    label='รั้ว'
                    checked={values.facility === 'fence'}
                    onChange={handleChange('facility')}
                    value='fence'
                  />
                  <Form.Radio
                    label='หลังคา'
                    checked={values.facility === 'roof'}
                    onChange={handleChange('facility')}
                    value='roof'
                  />
                </Form.Group>

                <Button onClick={this.continue} className='btn-paku' color='yellow' animated>
                  <Button.Content visible>ถัดไป</Button.Content>
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

export default PostFormStep2;