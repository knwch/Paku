import React, { Component } from 'react';
import { Grid, Form, Responsive, Container, Button, Icon } from 'semantic-ui-react';
import MapContainer from '../../map/MapContainer';

class PostFormStep1 extends Component {

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    
    const options = [
      { key: 'h', text: 'บ้าน', value: 'house' },
      { key: 'f', text: 'ลานกว้าง', value: 'field' },
      { key: 'o', text: 'อื่นๆ', value: 'other' }
    ];
    
    const { values, handleChange, handleMarker } = this.props;

    return (
      <Responsive>
        <Container fluid>
          <Grid className='mb-4'>
            <Grid.Column className='text-left pr-auto' mobile={16} tablet={8} computer={8}>
              <h4 className="mb-3">ลงประกาศที่จอดรถ</h4>
              <Form>
                <text>ให้เรารู้จักที่จอดรถของคุณ</text>
                <Form.Input
                  fluid
                  placeholder='ชื่อที่จอดรถ'
                  onChange={handleChange('name')}
                  value={values.name}
                />
                <MapContainer
                  center={values.currentlocation}
                  lat={values.currentlocation.lat}
                  lng={values.currentlocation.lng}
                  zoom={values.zoom}
                  show={values.show}
                  handleClick={handleMarker}
                />
                <h6>ขั้นตอนที่ 1</h6>
                <h5 className="mb-4">ที่จอดรถของคุณเป็นแบบไหน</h5>
                <Form.Group widths='equal'>
                  <Form.Select
                    fluid
                    placeholder='ประเภทที่จอดรถ'
                    onChange={handleChange('parkingtype')}
                    value={values.parkingtype}
                    options={options}
                  />
                  <Form.Input
                    fluid
                    placeholder='จำนวนที่จอดรถ'
                    onChange={handleChange('slot')}
                    value={values.slot}
                  />
                </Form.Group>

                <text>ประเภทรถที่สามารถจอดได้</text>
                <Form.Group inline>
                  <Form.Radio
                    label='รถยนต์'
                    checked={values.cartype === 'car'}
                    onChange={handleChange('cartype')}
                    value='car'
                  />
                  <Form.Radio
                    label='รถจักรยานยนต์'
                    checked={values.cartype === 'motorcycle'}
                    onChange={handleChange('cartype')}
                    value='motorcycle'
                  />
                  <Form.Radio
                    label='รถบรรทุก'
                    checked={values.cartype === 'truck'}
                    onChange={handleChange('cartype')}
                    value='truck'
                  />
                </Form.Group>

                <text>ช่วงเวลาที่คุณเปิดให้บริการ</text>
                <Form.Group widths='equal'>
                  <Form.Input
                    fluid
                    placeholder='ตั้งแต่'
                    onChange={handleChange('open')}
                    value={values.open}
                  />
                  <Form.Input
                    fluid
                    placeholder='จนถึง'
                    onChange={handleChange('close')}
                    value={values.close}
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
export default PostFormStep1;