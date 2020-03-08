import React, { Component } from 'react';
import { Responsive, Container, Button, Grid, Header, Label, Divider, Image, Item } from 'semantic-ui-react';
import { getPost } from '../../redux/actions/postActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MapContainer from '../map/MapContainer';

class MyPostDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            postid: '',
            title: '',
            photos: [],
            preview: [],
            filetemp: [],
            price: '',
            typeofpark: '',
            numberofcar: '',
            typeofcar: '',
            explain: '',
            rule: [],
            addrule: '',
            nearby: [],
            addnearby: '',
            facility: [],
            addfacility: [
                { key: '0', text: 'CCTV', value: 'CCTV', checked: false },
                { key: '1', text: 'ห้องน้ำ', value: 'ห้องน้ำ', checked: false },
                { key: '2', text: 'รั้ว', value: 'รั้ว', checked: false },
                { key: '3', text: 'หลังคากันแดด / กันฝน', value: 'หลังคากันแดด / กันฝน', checked: false }
            ],
            open: '',
            close: '',
            address: '',
            location: {
                lat: 13.7563,
                lng: 100.5018
            },
            zoom: 17,
            show: true,
            statustemp: false,
            errors: {}
        }
    }

    componentDidMount = () => {
        document.title = "Paku - Post"

        const postid = this.props.match.params.id
        this.props.getPost(postid);

        this.setState({
            postid: postid
        })

    }

    componentWillReceiveProps(nextProps) {

        const post = nextProps.post.post;
        const user = nextProps.auth.user;

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        if (post.user === user.id) {
            this.setState({
                title: post.title,
                photos: post.photos,
                preview: post.photos,
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

    render() {
        return (
            <Responsive>
                <Container fluid>
                    <Grid centered className='mb-4'>
                        <Grid.Row>
                            <div className='mr-4 img-center-square'>
                                <Image
                                    src={this.state.photos[0]}
                                    wrapped
                                    ui={false}
                                />
                            </div>
                        </Grid.Row>
                        <Grid.Column mobile={16} tablet={6} computer={6}>
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
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={4} computer={4}>
                            <Item.Group>
                                <Item>
                                    <Item.Content>
                                        <MapContainer
                                            center={this.state.location}
                                            lat={this.state.location.lat}
                                            lng={this.state.location.lng}
                                            zoom={this.state.zoom}
                                            show={this.state.show}
                                            height={'40vh'}
                                        />
                                    </Item.Content>
                                </Item>

                                <Divider />

                            </Item.Group>
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

export default connect(mapStateToProps, { getPost })(withRouter(MyPostDetail));