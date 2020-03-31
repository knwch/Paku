import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

class RecommendCard extends Component {

    render() {
        return (
            <Card.Group className='mb-4 link' centered>
                <Card href={this.props.url} link className='bg-transparent shadow-none mb-0' fluid>
                    <div className='img-center-180'>
                        <Image
                            src={this.props.photo}
                            wrapped
                            ui={false}
                        />
                    </div>
                {/* </Card>
                <Card link className='bg-transparent shadow-none mt-0' fluid> */}
                    <Card.Description textAlign='left' className='d-flex justify-content-between align-items-center pt-2 pb-0'>
                        <h5>
                            {this.props.title}
                        </h5>
                        <small>
                            <Icon name='yellow star' />
                            {this.props.rate}
                        </small>
                    </Card.Description>
                    <Card.Description textAlign='left' className='pb-1'>
                        กรุงเทพมหานคร
                    </Card.Description>
                    <Card.Description textAlign='left' className='pb-1'>
                        {this.props.price}/ชั่วโมง
                </Card.Description>
                </Card>
            </Card.Group>
        );
    }
}

export default RecommendCard;