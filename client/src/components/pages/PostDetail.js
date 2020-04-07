import React, { Component } from "react";
import {
  Responsive,
  Container,
  Grid,
  Divider,
  Image,
  Item,
  Icon,
  Header,
  Comment,
  Modal,
  Loader,
} from "semantic-ui-react";
import { getPost } from "../../redux/actions/postActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MapContainer from "../map/MapContainer";
import NavMenu from "../NavMenu";
import Footer from "../Footer";
import moment from "moment";
import "moment/locale/th";

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      postid: "",
      title: "",
      photos: [],
      preview: [],
      filetemp: [],
      price: "",
      typeofpark: "",
      numberofcar: "",
      typeofcar: "",
      explain: "",
      rule: [],
      addrule: "",
      nearby: [],
      addnearby: "",
      facility: [],
      rate: "",
      comments: [],
      addfacility: [
        { key: "0", text: "CCTV", value: "CCTV", checked: false },
        { key: "1", text: "ห้องน้ำ", value: "ห้องน้ำ", checked: false },
        { key: "2", text: "รั้ว", value: "รั้ว", checked: false },
        {
          key: "3",
          text: "หลังคากันแดด / กันฝน",
          value: "หลังคากันแดด / กันฝน",
          checked: false,
        },
      ],
      open: "",
      close: "",
      address: "",
      location: {
        lat: null,
        lng: null,
      },
      zoom: 15,
      show: true,
      statustemp: false,
      errors: {},
    };
  }

  componentWillMount = () => {
    document.title = "Paku - Post";

    const postid = this.props.match.params.id;
    this.props.getPost(postid);

    this.setState({
      postid: postid,
    });
  };

  componentWillReceiveProps(nextProps) {
    const post = nextProps.post.post;

    if (post === null) {
      window.location.href = "/mypost";
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (post._id) {
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
        comments: post.comments,
        rate: post.rate.rating,
        address: post.location.address,
        location: {
          lat: parseFloat(post.location.latitude),
          lng: parseFloat(post.location.longitude),
        },
      });
    }
  }

  render() {
    const { post, loading } = this.props.post;
    if (post === null || loading) {
      return (
        <Modal open={true} className="modal-paku" size="mini" basic>
          <Loader size="large" active inline="centered">
            <p>โปรดรอสักครู่</p>
          </Loader>
        </Modal>
      );
    } else {
      return (
        <Responsive>
          <NavMenu />
          <Container fluid>
            <Grid centered className="mb-4">
              <Grid.Row>
                {this.state.photos.map((photo, index) => {
                  return (
                    <div key={index} className="mb-3 mr-4 img-center-240">
                      <Image src={photo} wrapped ui={false} />
                    </div>
                  );
                })}
              </Grid.Row>
              <Grid.Column mobile={16} tablet={7} computer={7}>
                <Item.Group>
                  <Item>
                    <Item.Content>
                      <Header size="huge">
                        <div>{this.state.title}</div>
                      </Header>
                      <Item.Description>
                        <Icon name="map pin" /> {this.state.address}
                      </Item.Description>
                    </Item.Content>
                  </Item>

                  <Divider />

                  <Item>
                    <Item.Content>
                      <Item.Header>
                        <div>ประเภทที่สามารถจอดได้</div>
                      </Item.Header>
                      <Item.Description>
                        <Icon name="home" /> {this.state.typeofpark}
                      </Item.Description>
                      <Item.Description>
                        <Icon name="warehouse" /> จำนวนที่จอดรถ{" "}
                        {this.state.numberofcar} คัน
                      </Item.Description>
                    </Item.Content>
                  </Item>

                  <Item>
                    <Item.Content>
                      <Item.Header>
                        <div>ประเภทที่จอดรถ</div>
                      </Item.Header>
                      <Item.Description>
                        <Icon name="car" /> {this.state.typeofcar}
                      </Item.Description>
                    </Item.Content>
                  </Item>

                  <Item>
                    <Item.Content>
                      <Item.Header>
                        <div>ช่วงเวลาที่เปิดให้บริการ</div>
                      </Item.Header>
                      <Item.Description>
                        <Icon name="clock" /> ตั้งแต่ {this.state.open} จนถึง{" "}
                        {this.state.close}
                      </Item.Description>
                    </Item.Content>
                  </Item>

                  <Divider />

                  <Item>
                    <Item.Content>
                      <Item.Header>
                        <div>คำอธิบายที่จอดรถ</div>
                      </Item.Header>
                      <Item.Description>{this.state.explain}</Item.Description>
                    </Item.Content>
                  </Item>

                  <Item>
                    <Item.Content>
                      <Item.Header>
                        <div>กฎที่จอดรถ</div>
                      </Item.Header>
                      {(() => {
                        if (this.state.rule.length === 0) {
                          return <Item.Description>ไม่ระบุ</Item.Description>;
                        }
                      })()}
                      {this.state.rule.map((rule, index) => {
                        return (
                          <Item.Description key={index}>
                            {rule}
                          </Item.Description>
                        );
                      })}
                    </Item.Content>
                  </Item>
                  <Item>
                    <Item.Content>
                      <Item.Header>
                        <div>สถานที่ใกล้เคียง</div>
                      </Item.Header>
                      {(() => {
                        if (this.state.nearby.length === 0) {
                          return <Item.Description>ไม่ระบุ</Item.Description>;
                        }
                      })()}
                      {this.state.nearby.map((nearby, index) => {
                        return (
                          <Item.Description key={index}>
                            {nearby}
                          </Item.Description>
                        );
                      })}
                    </Item.Content>
                  </Item>

                  <Item>
                    <Item.Content>
                      <Item.Header>
                        <div>สิ่งอำนวยความสะดวก</div>
                      </Item.Header>
                      {(() => {
                        if (this.state.facility.length === 0) {
                          return <Item.Description>ไม่ระบุ</Item.Description>;
                        }
                      })()}
                      {this.state.facility.map((facility, index) => {
                        return (
                          <Item.Description key={index}>
                            {facility}
                          </Item.Description>
                        );
                      })}
                    </Item.Content>
                  </Item>

                  <Divider />
                </Item.Group>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={5} computer={5}>
                <Item.Group>
                  <Header>
                    <div>
                      <Icon name="map" />
                      แผนที่
                    </div>
                  </Header>

                  <Item>
                    <Item.Content>
                      <MapContainer
                        center={this.state.location}
                        lat={this.state.location.lat}
                        lng={this.state.location.lng}
                        zoom={this.state.zoom}
                        show={this.state.show}
                        height={"40vh"}
                      />
                    </Item.Content>
                  </Item>

                  <Divider />
                </Item.Group>
              </Grid.Column>

              <Grid.Column
                className="pt-0"
                textAlign="left"
                mobile={16}
                tablet={12}
                computer={12}
              >
                <Comment.Group minimal>
                  <Header as="h3">
                    <div>ความคิดเห็น</div>
                  </Header>
                  {(() => {
                    if (this.state.comments.length === 0) {
                      return <div>ไม่มีความคิดเห็นสำหรับที่จอดรถนี้</div>;
                    } else if (this.state.comments.length > 0) {
                      return this.state.comments.map((comment, index) => {
                        if (comment.comment !== "")
                          return (
                            <Comment key={index}>
                              <Comment.Avatar as="a" src={comment.photoUser} />
                              <Comment.Content>
                                <Comment.Author as="a">
                                  {comment.name.firstname}
                                </Comment.Author>
                                <Comment.Metadata>
                                  <span>
                                    {moment(
                                      new Date(comment.created)
                                    ).fromNow()}
                                  </span>
                                </Comment.Metadata>
                                <Comment.Text>{comment.comment}</Comment.Text>
                              </Comment.Content>
                            </Comment>
                          );
                      });
                    }
                  })()}
                </Comment.Group>
              </Grid.Column>
            </Grid>
          </Container>
          <Footer />
        </Responsive>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPost })(withRouter(PostDetail));
