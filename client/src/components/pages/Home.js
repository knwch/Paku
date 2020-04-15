import React, { Component } from "react";
import RecommendCard from "../cards/RecommendCard";
import { Grid, Responsive, Header } from "semantic-ui-react";
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
    return (
      <Responsive>
        <NavMenu />
        <SearchBox />
        <Grid
          style={{
            "margin-left": "2rem",
            "margin-right": "2rem",
          }}
          className="mt-5 mb-5"
        >
          <Header textAlign="left" as="h2" className="mb-3">
            <div>ที่จอดรถแนะนำ</div>
          </Header>
          <Grid.Row columns={4} centered>
            {this.state.recommendset.map((post, index) => {
              return (
                <Grid.Column key={index} mobile={16} tablet={4} computer={4}>
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
        </Grid>
        <Footer />
      </Responsive>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  post: state.post,
});

export default connect(mapStateToProps, {
  recommendPost,
})(withRouter(Home));
