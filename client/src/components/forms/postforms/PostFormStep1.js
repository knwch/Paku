import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { Grid, Form, Responsive, Container, Button, Icon, Header, Modal, Transition, Label } from 'semantic-ui-react';
import MapContainer from '../../map/MapContainer';

class PostFormStep1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };

    this.validator = new SimpleReactValidator({
      validators: {
        thai: {  // name the rule
          message: ':attribute ภาษาไทย',
          rule: (val, params, validator) => {
            return validator.helpers.testRegex(val, /^[ก-์]*$/i);
          }
        }
      },
      element: message =>
        <div className='mb-2'>
          <Transition
            animation='shake'
            duration={250}
            transitionOnMount={true}
          >
            <Label basic color='red' pointing>{message}</Label>
          </Transition>
          <br />
        </div>,
      messages: {
        required: 'โปรดระบุ:attribute',
        alpha_num: 'โปรดระบุเฉพาะตัวอักษรหรือตัวเลขเท่านั้น',
        integer: 'โปรดระบุเฉพาะตัวเลขเท่านั้น',
        string: 'โปรดระบุเฉพาะตัวอักษรเท่านั้น'
      }
    });

  }

  continue = e => {
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

  handleCancelLocation = e => {
    e.preventDefault();
    this.setState({
      modalOpen: false
    })
    this.props.handleCancelLocation();
  }

  handleOpenModal = () => this.setState({ modalOpen: true })

  handleConfirmLocation = () => {
    this.setState({
      modalOpen: false
    })
  }

  render() {

    const options = [
      { key: 'h', text: 'บ้าน', value: 'บ้าน' },
      { key: 'f', text: 'ลานกว้าง', value: 'ลานกว้าง' },
      { key: 'o', text: 'อื่นๆ', value: 'อื่นๆ' }
    ];

    const times = [
      { text: '00.00', value: 0.00 },
      { text: '00.30', value: 0.30 },
      { text: '01.00', value: 1.00 },
      { text: '01.30', value: 1.30 },
      { text: '02.00', value: 2.00 },
      { text: '02.30', value: 2.30 },
      { text: '03.00', value: 3.00 },
      { text: '03.30', value: 3.30 },
      { text: '04.00', value: 4.00 },
      { text: '04.30', value: 4.30 },
      { text: '05.00', value: 5.00 },
      { text: '05.30', value: 5.30 },
      { text: '06.00', value: 6.00 },
      { text: '06.30', value: 6.30 },
      { text: '07.00', value: 7.00 },
      { text: '07.30', value: 7.30 },
      { text: '08.00', value: 8.00 },
      { text: '08.30', value: 8.30 },
      { text: '09.00', value: 9.00 },
      { text: '09.30', value: 9.30 },
      { text: '10.00', value: 10.00 },
      { text: '10.30', value: 10.30 },
      { text: '11.00', value: 11.00 },
      { text: '11.30', value: 11.30 },
      { text: '12.00', value: 12.00 },
      { text: '12.30', value: 12.30 },
      { text: '13.00', value: 13.00 },
      { text: '13.30', value: 13.30 },
      { text: '14.00', value: 14.00 },
      { text: '14.30', value: 14.30 },
      { text: '15.00', value: 15.00 },
      { text: '15.30', value: 15.30 },
      { text: '16.00', value: 16.00 },
      { text: '16.30', value: 16.30 },
      { text: '17.00', value: 17.00 },
      { text: '17.30', value: 17.30 },
      { text: '18.00', value: 18.00 },
      { text: '18.30', value: 18.30 },
      { text: '19.00', value: 19.00 },
      { text: '19.30', value: 19.30 },
      { text: '20.00', value: 20.00 },
      { text: '20.30', value: 20.30 },
      { text: '21.00', value: 21.00 },
      { text: '21.30', value: 21.30 },
      { text: '22.00', value: 22.00 },
      { text: '22.30', value: 22.30 },
      { text: '23.00', value: 23.00 },
      { text: '23.30', value: 23.30 }
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
                  onChange={handleChange('title')}
                  value={values.title}
                />
                {this.validator.message('ชื่อที่จอดรถ', values.title, 'required')}
                <Form.Input
                  fluid
                  placeholder='ที่อยู่'
                  onChange={handleChange('address')}
                  value={values.address}
                />
                {this.validator.message('ที่อยู่', values.address, 'required')}

                <Button
                  onClick={this.handleOpenModal}
                  basic
                  circular
                >
                  <Icon name='map' /> <text>ระบุตำแหน่ง</text>
                </Button>

                <Header as='h6'><div>ขั้นตอนที่ 1</div></Header>
                <Header as='h3'><div>ที่จอดรถของคุณเป็นแบบไหน</div></Header>
                <Form.Group widths='equal'>
                  <Form.Select
                    fluid
                    placeholder='ประเภทที่จอดรถ'
                    onChange={handleChange('typeofpark')}
                    value={values.typeofpark}
                    options={options}
                  />
                  <Form.Input
                    fluid
                    placeholder='จำนวนที่จอดรถ'
                    onChange={handleChange('numberofcar')}
                    value={values.numberofcar}
                  />
                </Form.Group>
                {this.validator.message('ประเภทที่จอดรถ', values.typeofpark, 'required')}
                {this.validator.message('จำนวนที่จอดรถ', values.numberofcar, 'required')}

                <Header as='h4'><div>ประเภทรถที่สามารถจอดได้</div></Header>
                <Form.Group inline>
                  <Form.Radio
                    label='รถยนต์'
                    checked={values.typeofcar === 'รถยนต์'}
                    onChange={handleChange('typeofcar')}
                    value='รถยนต์'
                  />
                  <Form.Radio
                    label='รถจักรยานยนต์'
                    checked={values.typeofcar === 'รถจักรยานยนต์'}
                    onChange={handleChange('typeofcar')}
                    value='รถจักรยานยนต์'
                  />
                  <Form.Radio
                    label='รถบรรทุก'
                    checked={values.typeofcar === 'รถบรรทุก'}
                    onChange={handleChange('typeofcar')}
                    value='รถบรรทุก'
                  />
                </Form.Group>
                {this.validator.message('ประเภทรถ', values.typeofcar, 'required')}

                <Header as='h4'><div>ช่วงเวลาที่คุณเปิดให้บริการ</div></Header>
                <Form.Group widths='equal'>
                  <Form.Select
                    fluid
                    placeholder='ตั้งแต่'
                    onChange={handleChange('open')}
                    value={values.open}
                    options={times}
                  />
                  <Form.Select
                    fluid
                    placeholder='จนถึง'
                    onChange={handleChange('close')}
                    value={values.close}
                    options={times}
                  />
                  {/* <Form.Input
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
                  /> */}
                </Form.Group>
                {this.validator.message('เวลาเปิด', values.open, 'required')}
                {this.validator.message('เวลาปิด', values.close, 'required')}
                <Button onClick={this.continue} className='btn-paku' color='yellow' animated>
                  <Button.Content visible>ถัดไป</Button.Content>
                  <Button.Content hidden>
                    <Icon name='arrow right' />
                  </Button.Content>
                </Button>

                <Modal
                  open={this.state.modalOpen}
                  className="modal-paku"
                  size='small'
                >
                  <Modal.Content>
                    <MapContainer
                      center={values.location}
                      lat={values.location.lat}
                      lng={values.location.lng}
                      zoom={values.zoom}
                      show={values.show}
                      handleClick={handleMarker}
                      height={'100vh'}
                    />
                  </Modal.Content>
                  <Modal.Actions>
                    <Button basic onClick={this.handleCancelLocation}>
                      <text>ยกเลิก</text>
                    </Button>
                    <Button className='btn-paku' onClick={this.handleConfirmLocation}>
                      <Icon name='checkmark' /> <text>ตกลง</text>
                    </Button>
                  </Modal.Actions>
                </Modal>

              </Form>
            </Grid.Column>
          </Grid>
        </Container>
      </Responsive>
    );
  }
}
export default PostFormStep1;