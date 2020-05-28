import React, { Component } from "react";
import { Card, Icon, Image } from "semantic-ui-react";

class NearbyCard extends Component {
  render() {
    return (
      <Card.Group className="mb-4 link" centered>
        <Card
          href={this.props.url}
          link
          className="mb-0 text-decoration-none"
          fluid
        >
          <div className="img-center-180-y">
            <Image src={this.props.photo} wrapped ui={false} />
          </div>
          <Card.Content>
            <Card.Description
              textAlign="left"
              className="d-flex justify-content-between align-items-center pt-2 pb-0"
            >
              <h5>
                <div>{this.props.title}</div>
              </h5>
              <small>
                <Icon name="star" color="yellow" /> {this.props.rate.toFixed(1)}
              </small>
            </Card.Description>
            <Card.Description textAlign="left" className="pb-1">
              กรุงเทพมหานคร
            </Card.Description>
            <Card.Description textAlign="left" className="pb-1">
              {this.props.price}/ชั่วโมง
            </Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
    );
  }
}

export default NearbyCard;
