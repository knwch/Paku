import React, { Component } from 'react';
import BookingForm from '../forms/bookingforms/BookingForm';
import { Responsive, Container, Button, Grid, Header, Label, Divider, Image, Item, Form, Icon, Card } from 'semantic-ui-react';
import { getPost } from '../../redux/actions/postActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MapContainer from '../map/MapContainer';

class Book extends Component {

    constructor(props) {
        super(props);
        this.state = {
            postid: '',
            book_date: '',
            book_start: '',
            book_end: '',
            book_contact: '',
            book_plate: '',
            book_description: '',
            book_payment: 'เงินสด',
            title: '',
            photos: [],
            price: '',
            typeofpark: '',
            numberofcar: '',
            typeofcar: '',
            explain: '',
            rule: [],
            nearby: [],
            facility: [],
            open: '',
            close: '',
            address: '',
            location: {
                lat: null,
                lng: null
            },
            zoom: 15,
            show: true,
            errors: {}
        }
    }

    componentDidMount = () => {
        document.title = "Paku - Booking"

        const postid = this.props.match.params.id
        this.props.getPost(postid);

        this.setState({
            postid: postid
        })

    }

    componentWillReceiveProps(nextProps) {

        const post = nextProps.post.post;

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        if (post._id) {
            this.setState({
                title: post.title,
                photos: post.photos,
                price: post.price,
                typeofpark: post.detail.typeofpark,
                numberofcar: post.detail.numberofcar,
                typeofcar: post.detail.typeofcar,
                explain: post.detail.explain,
                rule: post.detail.rule,
                nearby: post.detail.nearby,
                facility: post.detail.facility,
                open: post.date.open,
                close: post.date.close,
                address: post.location.address,
                location: {
                    lat: parseFloat(post.location.latitude),
                    lng: parseFloat(post.location.longitude)
                }
            })
        }

    }

    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    };

    handleSubmit = (e) =>  {
        e.preventDefault();
    }

    render() {

        const payments = [
            { text: 'เงินสด', value: 'เงินสด' }
        ];

        const times = [
            { text: '00.00', value: '00.00' },
            { text: '00.30', value: '00.30' },
            { text: '01.00', value: '01.00' },
            { text: '01.30', value: '01.30' },
            { text: '02.00', value: '02.00' },
            { text: '02.30', value: '02.30' },
            { text: '03.00', value: '03.00' },
            { text: '03.30', value: '03.30' },
            { text: '04.00', value: '04.00' },
            { text: '04.30', value: '04.30' },
            { text: '05.00', value: '05.00' },
            { text: '05.30', value: '05.30' },
            { text: '06.00', value: '06.00' },
            { text: '06.30', value: '06.30' },
            { text: '07.00', value: '07.00' },
            { text: '07.30', value: '07.30' },
            { text: '08.00', value: '08.00' },
            { text: '08.30', value: '08.30' },
            { text: '09.00', value: '09.00' },
            { text: '09.30', value: '09.30' },
            { text: '10.00', value: '10.00' },
            { text: '10.30', value: '10.30' },
            { text: '11.00', value: '11.00' },
            { text: '11.30', value: '11.30' },
            { text: '12.00', value: '12.00' },
            { text: '12.30', value: '12.30' },
            { text: '13.00', value: '13.00' },
            { text: '13.30', value: '13.30' },
            { text: '14.00', value: '14.00' },
            { text: '14.30', value: '14.30' },
            { text: '15.00', value: '15.00' },
            { text: '15.30', value: '15.30' },
            { text: '16.00', value: '16.00' },
            { text: '16.30', value: '16.30' },
            { text: '17.00', value: '17.00' },
            { text: '17.30', value: '17.30' },
            { text: '18.00', value: '18.00' },
            { text: '18.30', value: '18.30' },
            { text: '19.00', value: '19.00' },
            { text: '19.30', value: '19.30' },
            { text: '20.00', value: '20.00' },
            { text: '20.30', value: '20.30' },
            { text: '21.00', value: '21.00' },
            { text: '21.30', value: '21.30' },
            { text: '22.00', value: '22.00' },
            { text: '22.30', value: '22.30' },
            { text: '23.00', value: '23.00' },
            { text: '23.30', value: '23.30' }
        ];

        return (
            <Responsive>
                <Container fluid>
                    <Grid centered className='mb-4'>

                        <Grid.Row>
                            {this.state.photos.map((photo, index) => {
                                return (
                                    <div key={index} className='mb-3 mr-4 img-center-240'>
                                        <Image
                                            src={photo}
                                            wrapped
                                            ui={false}
                                        />
                                    </div>
                                )
                            })}
                        </Grid.Row>

                        <Grid.Column mobile={16} tablet={7} computer={7}>
                            <Card fluid>
                                <Card.Content>
                                    <Form>
                                        <Header as='h3'><div>จองที่จอดรถ</div></Header>
                                        <Form.Input
                                            className='mt-3 mb-0'
                                            fluid
                                            placeholder='เพิ่มกฎของคุณ (ไม่บังคับ)'
                                        >
                                            <input type='date' value={this.state.book_date} onChange={this.handleChange('book_date')} />
                                        </Form.Input>
                                        <Form.Group className='mt-3 mb-0' widths='equal'>
                                            <Form.Dropdown
                                                fluid
                                                search
                                                selection
                                                lazyLoad
                                                placeholder='ตั้งแต่'
                                                onChange={this.handleChange('book_start')}
                                                value={this.state.book_start}
                                                options={times}
                                            />
                                            <Form.Dropdown
                                                fluid
                                                search
                                                selection
                                                lazyLoad
                                                placeholder='จนถึง'
                                                onChange={this.handleChange('book_end')}
                                                value={this.state.book_end}
                                                options={times}
                                            />
                                        </Form.Group>
                                        <Header as='h3'><div>รายละเอียดของคุณ</div></Header>
                                        <Form.Group className='mt-3 mb-0' widths='equal'>
                                            <Form.Input
                                                fluid
                                                placeholder='เบอร์ติดต่อ'
                                                onChange={this.handleChange('book_contact')}
                                                value={this.state.book_contact}
                                            />
                                            <Form.Input
                                                fluid
                                                placeholder='ทะเบียนรถ'
                                                onChange={this.handleChange('book_plate')}
                                                value={this.state.book_plate}
                                            />
                                        </Form.Group>
                                        <Form.Input
                                            className='mt-3 mb-0'
                                            fluid
                                            placeholder='หมายเหตุถึงเจ้าของที่จอดรถ'
                                            onChange={this.handleChange('book_description')}
                                            value={this.state.book_description}
                                        />
                                        <Header as='h3'><div>รายละเอียดของคุณ</div></Header>
                                        <Form.Dropdown
                                            className='mt-3 mb-0'
                                            fluid
                                            selection
                                            placeholder='จนถึง'
                                            onChange={this.handleChange('book_payment')}
                                            value={this.state.book_payment}
                                            options={payments}
                                        />

                                        <Divider className='mt-4 mb-4' />

                                        <Item.Group>
                                            <Item>
                                                <Item.Content>
                                                    <Item.Description>ราคาที่จอดรถ {this.state.price} บาท / ชั่วโมง</Item.Description>
                                                    <Item.Description>จำนวน</Item.Description>
                                                    <Item.Description>ราคารวม</Item.Description>
                                                </Item.Content>
                                            </Item>
                                        </Item.Group>

                                        <Button onClick={this.handleSubmit} className='btn-paku' color='yellow' floated='right'>
                                            <Button.Content visible>จองทันที</Button.Content>
                                        </Button>

                                    </Form>
                                </Card.Content>
                            </Card>
                        </Grid.Column>

                        <Grid.Column mobile={16} tablet={7} computer={7}>
                            <Item.Group>
                                <Item>
                                    <Item.Content>
                                        <Item.Header><div>{this.state.title}</div></Item.Header>
                                        <Item.Description>{this.state.address}</Item.Description>
                                    </Item.Content>
                                </Item>

                                <Divider />

                                <Item>
                                    <Item.Content>
                                        <Item.Header><div>ประเภทที่สามารถจอดได้</div></Item.Header>
                                        <Item.Description>{this.state.typeofpark}</Item.Description>
                                        <Item.Description>จำนวนที่จอดรถ {this.state.numberofcar} คัน</Item.Description>
                                    </Item.Content>
                                </Item>

                                <Item>
                                    <Item.Content>
                                        <Item.Header><div>ประเภทที่จอดรถ</div></Item.Header>
                                        <Item.Description>{this.state.typeofcar}</Item.Description>
                                    </Item.Content>
                                </Item>

                                <Item>
                                    <Item.Content>
                                        <Item.Header><div>ช่วงเวลาที่เปิดให้บริการ</div></Item.Header>
                                        <Item.Description>ตั้งแต่ {this.state.open} จนถึง {this.state.close}</Item.Description>
                                    </Item.Content>
                                </Item>

                                <Divider />

                                <Item>
                                    <Item.Content>
                                        <Item.Header><div>คำอธิบายที่จอดรถ</div></Item.Header>
                                        <Item.Description>{this.state.explain}</Item.Description>
                                    </Item.Content>
                                </Item>

                                <Item>
                                    <Item.Content>
                                        <Item.Header><div>กฎที่จอดรถ</div></Item.Header>
                                        {(() => {
                                            if (this.state.rule.length === 0) {
                                                return (
                                                    <Item.Description>ไม่ระบุ</Item.Description>
                                                )
                                            }
                                        })()}
                                        {this.state.rule.map((rule, index) => {
                                            return (
                                                <Item.Description key={index}>{rule}</Item.Description>
                                            )
                                        })}
                                    </Item.Content>
                                </Item>
                                <Item>
                                    <Item.Content>
                                        <Item.Header><div>สถานที่ใกล้เคียง</div></Item.Header>
                                        {(() => {
                                            if (this.state.nearby.length === 0) {
                                                return (
                                                    <Item.Description>ไม่ระบุ</Item.Description>
                                                )
                                            }
                                        })()}
                                        {this.state.nearby.map((nearby, index) => {
                                            return (
                                                <Item.Description key={index}>{nearby}</Item.Description>
                                            )
                                        })}
                                    </Item.Content>
                                </Item>

                                <Item>
                                    <Item.Content>
                                        <Item.Header><div>สิ่งอำนวยความสะดวก</div></Item.Header>
                                        {(() => {
                                            if (this.state.facility.length === 0) {
                                                return (
                                                    <Item.Description>ไม่ระบุ</Item.Description>
                                                )
                                            }
                                        })()}
                                        {this.state.facility.map((facility, index) => {
                                            return (
                                                <Item.Description key={index}>{facility}</Item.Description>
                                            )
                                        })}
                                    </Item.Content>
                                </Item>

                                <Divider />

                            </Item.Group>

                            <Grid.Row>
                                <MapContainer
                                    center={this.state.location}
                                    lat={this.state.location.lat}
                                    lng={this.state.location.lng}
                                    zoom={this.state.zoom}
                                    show={this.state.show}
                                    height={'40vh'}
                                />
                            </Grid.Row>

                        </Grid.Column>

                    </Grid>
                </Container>
            </Responsive>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
    post: state.post,
    auth: state.auth
})

export default connect(mapStateToProps, { getPost })(withRouter(Book));