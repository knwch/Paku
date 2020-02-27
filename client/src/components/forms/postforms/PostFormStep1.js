import React, { Component } from 'react';
import { Grid, Form, Responsive, Container, Button, Icon, Header } from 'semantic-ui-react';
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
              <Header as='h3'><div>มาเริ่มลงประกาศที่จอดรถกันเถอะ</div></Header>
              <Form>
                <Header as='h4'><div>ให้เรารู้จักที่จอดรถของคุณ</div></Header>
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
                <Header as='h6'><div>ขั้นตอนที่ 1</div></Header>
                <Header as='h3'><div>ที่จอดรถของคุณเป็นแบบไหน</div></Header>
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

                <Header as='h4'><div>ประเภทรถที่สามารถจอดได้</div></Header>
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

                <Header as='h4'><div>ช่วงเวลาที่คุณเปิดให้บริการ</div></Header>
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