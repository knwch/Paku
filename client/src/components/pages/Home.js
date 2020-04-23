import React, { Component } from "react";
import RecommendCard from "../cards/RecommendCard";
import {
  Grid,
  Responsive,
  Header,
  List,
  Image,
  Label,
  Modal,
  Loader,
  Icon,
  Transition,
} from "semantic-ui-react";
import { recommendPost } from "../../redux/actions/postActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import NavMenu from "../NavMenu";
import Footer from "../Footer";
import SearchBox from "../SearchBox";

class Home extends Component {
  constructor() {
    super();
    this.state = { recommendset: [] };
  }

  componentWillMount() {
    document.title = "Paku - Home";
    document.body.classList.add("Background-Yellow");
    this.props.recommendPost();
  }

  componentWillUnmount() {
    document.body.classList.remove("Background-Yellow");
  }

  // handleLogoutModal = () => {
  //   this.setState({ modalLogout: true })
  //   setTimeout(function () {
  //     this.setState({ modalLogout: false })
  //   }.bind(this), 2250);
  // }

  // successLogoutModal = () => {
  //   return (
  //     <Modal
  //       open={this.state.modalLogout}
  //       className="modal-paku"
  //       size='mini'
  //     >
  //       <Modal.Content>
  //         <div className='text-center'>
  //           <Transition
  //             animation='tada'
  //             duration={1500}
  //             transitionOnMount={true}
  //           >
  //             <Icon.Group size='big'>
  //               <Icon loading size='huge' name='circle outline' />
  //               <Icon size='big' name='check' color='yellow' />
  //             </Icon.Group>
  //           </Transition>
  //           <Header>ลงทะเบียนสำเร็จ</Header>
  //         </div>
  //       </Modal.Content>
  //     </Modal>
  //   );
  // }

  componentWillReceiveProps(nextProps) {
    const posts = nextProps.post.post_recommend;

    if (posts != null) {
      if (posts.length !== 0) {
        this.setState({
          recommendset: posts,
        });
      }
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

          <Header as="h1" className="pb-2">
            <Image className="mb-2" src={require("../imgs/Logo.png")} />
            <br></br>
            <Header.Content as="h5">
              <div className="font-weight-bold">PAKU</div>
              <Header.Subheader className="pt-2">
                <div>Find your park with Paku</div>
              </Header.Subheader>
            </Header.Content>
          </Header>

          <SearchBox />
          <Transition
            animation="scale"
            duration={1500}
            transitionOnMount={true}
          >
            <Grid
              style={{
                "margin-left": "2rem",
                "margin-right": "2rem",
              }}
              className="mt-5 mb-5"
            >
              <Grid.Row columns={4} only="computer tablet" centered>
                <Grid.Column mobile={16} tablet={4} computer={3} widescreen={2}>
                  <Header textAlign="left" as="h2" className="mb-3">
                    <div>ที่จอดรถแนะนำ</div>
                  </Header>
                </Grid.Column>
                <Grid.Column
                  mobile={16}
                  tablet={4}
                  computer={3}
                  widescreen={2}
                ></Grid.Column>
                <Grid.Column
                  mobile={16}
                  tablet={4}
                  computer={3}
                  widescreen={2}
                ></Grid.Column>
                <Grid.Column
                  mobile={16}
                  tablet={4}
                  computer={3}
                  widescreen={2}
                ></Grid.Column>
              </Grid.Row>

              <Grid.Column only="mobile" mobile={16}>
                <Header textAlign="left" as="h2" className="mb-3">
                  <div>ที่จอดรถแนะนำ</div>
                </Header>
              </Grid.Column>

              <Grid.Row columns={4} centered>
                {this.state.recommendset.map((post, index) => {
                  return (
                    <Grid.Column
                      key={index}
                      mobile={16}
                      tablet={4}
                      computer={3}
                      widescreen={2}
                    >
                      <RecommendCard
                        photo={post.photos}
                        title={post.title}
                        rate={post.rate.rating}
                        price={post.price}
                        url={`/book/${post._id}`}
                      />
                    </Grid.Column>
                  );
                })}
              </Grid.Row>

              <Grid.Row columns={1} centered>
                <Grid.Column mobile={16} tablet={12} computer={12}>
                  <Transition
                    animation="scale"
                    duration={2500}
                    transitionOnMount={true}
                  >
                    <List animated verticalAlign="middle">
                      <List.Item>
                        <List.Icon>
                          <Label circular className="btn-paku-light">
                            1
                          </Label>
                        </List.Icon>
                        <List.Content>
                          <List.Header>
                            <div>เลือกจุดหมายที่คุณต้องการจอดรถ</div>
                          </List.Header>
                        </List.Content>
                      </List.Item>

                      <List.Icon>
                        <Label className="border-0 " basic circular>
                          <Icon
                            name="long arrow alternate down"
                            color="grey"
                            fitted
                          />
                        </Label>
                      </List.Icon>

                      <List.Item>
                        <List.Icon>
                          <Label circular className="btn-paku-light">
                            2
                          </Label>
                        </List.Icon>
                        <List.Content>
                          <List.Header>
                            <div>เลือกที่จอดรถที่คุณต้องการ</div>
                          </List.Header>
                        </List.Content>
                      </List.Item>

                      <List.Icon>
                        <Label className="border-0 " basic circular>
                          <Icon
                            name="long arrow alternate down"
                            color="grey"
                            fitted
                          />
                        </Label>
                      </List.Icon>

                      <List.Item>
                        <List.Icon>
                          <Label circular className="btn-paku-light">
                            3
                          </Label>
                        </List.Icon>
                        <List.Content>
                          <List.Header>
                            <div>กรอกข้อมูลการจอง</div>
                          </List.Header>
                        </List.Content>
                      </List.Item>

                      <List.Icon>
                        <Label className="border-0 " basic circular>
                          <Icon
                            name="long arrow alternate down"
                            color="grey"
                            fitted
                          />
                        </Label>
                      </List.Icon>

                      <List.Item>
                        <List.Icon>
                          <Label circular className="btn-paku-light">
                            4
                          </Label>
                        </List.Icon>
                        <List.Content>
                          <List.Header>
                            <div>ยืนยันการจอง</div>
                          </List.Header>
                        </List.Content>
                      </List.Item>

                      <List.Icon>
                        <Label className="border-0 " basic circular>
                          <Icon
                            name="long arrow alternate down"
                            color="grey"
                            fitted
                          />
                        </Label>
                      </List.Icon>

                      <List.Item>
                        <List.Icon>
                          <Label circular className="btn-paku-light">
                            5
                          </Label>
                        </List.Icon>
                        <List.Content>
                          <List.Header>
                            <div>เช็คอิน - เช็คเอาท์</div>
                          </List.Header>
                        </List.Content>
                      </List.Item>

                      <List.Icon>
                        <Label className="border-0 " basic circular>
                          <Icon
                            name="long arrow alternate down"
                            color="grey"
                            fitted
                          />
                        </Label>
                      </List.Icon>

                      <List.Item>
                        <List.Icon>
                          <Label circular className="btn-paku-light">
                            6
                          </Label>
                        </List.Icon>
                        <List.Content>
                          <List.Header>
                            <div>ให้คะแนนความพึงพอใจ และความคิดเห็น</div>
                          </List.Header>
                        </List.Content>
                      </List.Item>
                    </List>
                  </Transition>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Transition>
          <Footer />
        </Responsive>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  post: state.post,
});

export default connect(mapStateToProps, {
  recommendPost,
})(withRouter(Home));
