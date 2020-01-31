import React, { Component } from 'react';
import { Icon, Input, Button, Label, Form, Grid, Card } from 'semantic-ui-react';

class RegistConfirm extends Component {

  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: { username,
        firstname,
        lastname,
        telephone,
        email,
        birth }
    } = this.props;

    return (
      <Grid className='mb-4' centered>
        <Grid.Column mobile={14} tablet={7} computer={6}>
          <Card>
            <Card.Content>
              <Card.Header>ตรวจสอบความถูกต้อง</Card.Header>
            </Card.Content>
            <Card.Content>
              <text className="card-text">ชื่อผู้ใช้: {username}</text><br />
              <text className="card-text">ชื่อ: {firstname} {lastname}</text><br />
              <text className="card-text">เบอร์โทรศัพท์: {telephone}</text><br />
              <text className="card-text">อีเมล: {email}</text><br />
              <text className="card-text">วันเกิด: {birth}</text>
            </Card.Content>

            <Button onClick={this.back} className='btn-paku' animated>
              <Button.Content visible>ย้อนกลับ</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow left' />
              </Button.Content>
            </Button>
            <Button onClick={this.continue} className='btn-paku' animated>
              <Button.Content visible>ยืนยัน</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow right' />
              </Button.Content>
            </Button>

          </Card>
        </Grid.Column>
      </Grid>
    );
  }
}

export default RegistConfirm;
