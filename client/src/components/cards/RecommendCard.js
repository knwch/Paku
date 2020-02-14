import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

class RecommendCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "aaabbcds",
            rating: "4.93",
            area: "ccc",
            price: "ddd"
        };
    }

    render() {
        return (
            <Card.Group className='mb-4' centered>
                <Card link className='shadow-none mb-0' fluid>
                    <Image src={require('../imgs/parking-test.jpg')} circular wrapped />
                </Card>
                <Card link className='bg-transparent shadow-none mt-0' fluid>
                    <Card.Description textAlign='left' className='d-flex justify-content-between align-items-center pt-2 pb-0'>
                        <h5>
                            {this.state.name}
                        </h5>
                        <small>
                            <Icon name='yellow star' />
                            3.14
                    </small>
                    </Card.Description>
                    <Card.Description textAlign='left' className='pb-1'>
                        กรุงเทพมหานคร
                </Card.Description>
                    <Card.Description textAlign='left' className='pb-1'>
                        120/hour
                </Card.Description>
                </Card>
            </Card.Group>
            // <div className="Card">
            //     <div className="card mb-4 border-0">
            //         <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
            //         <div className="card-body text-left p-0 pt-2">
            //             <div className="d-flex justify-content-between align-items-center">
            //                 <text className="card-text font-weight-bold"> {this.state.name} </text>
            //                 <small className="text-muted"> {this.state.rating} </small>
            //             </div>
            //             <small className="card-text"> {this.state.area} </small><br></br>
            //             <small className="card-text font-weight-bold"> {this.state.price} / HOUR</small>
            //         </div>
            //     </div>
            // </div>
        );
    }
}

export default RecommendCard;