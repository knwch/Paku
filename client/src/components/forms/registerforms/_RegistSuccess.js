import React, { Component } from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class RegistSuccess extends Component {

  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    return (
      <Card centered>
        <Card.Content>
          <Icon
            floated='right'
            size='huge'
            name='check circle outline'
            className='mb-3'
          />
          <Card.Header>ลงทะเบียนสำเร็จ</Card.Header>
          <Card.Description>
            ...
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Link to="/login">
            <Button basic color='green'>
              รับทราบ
          </Button>
          </Link>
        </Card.Content>
      </Card>
    );
  }
}

export default RegistSuccess;
