import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import styles from "../map/mapStyles";
import NearbyCard from "../cards/NearbyCard";
import NavMenu from "../NavMenu";
import Footer from "../Footer";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getPosts, recommendPost } from "../../redux/actions/postActions";
import {
  Grid,
  Responsive,
  Container,
  Icon,
  Popup,
  Modal,
  Loader,
  Header,
  Image,
} from "semantic-ui-react";
import { key } from "../../config/keymap";
import SearchBox from "../SearchBox";

// // Return map bounds based on list of places
// const getMapBounds = (map, maps, places) => {
//     const bounds = new maps.LatLngBounds();

//     places.forEach((place) => {
//         bounds.extend(new maps.LatLng(
//             place.location.latitude,
//             place.location.longitude,
//         ));
//     });
//     return bounds;
// };

// // Re-center map when resizing the window
// const bindResizeListener = (map, maps, bounds) => {
//     maps.event.addDomListenerOnce(map, 'idle', () => {
//         maps.event.addDomListener(window, 'resize', () => {
//             map.fitBounds(bounds);
//         });
//     });
// };

// // Fit map to its bounds after the api is loaded
// const apiIsLoaded = (map, maps, places) => {
//     // Get bounds by our places
//     const bounds = getMapBounds(map, maps, places);
//     // Fit map to bounds
//     map.fitBounds(bounds);
//     // Bind the resize listener
//     bindResizeListener(map, maps, bounds);
// };

class Rent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      recommendset: [],
      location: {
        lat: 13.7563,
        lng: 100.5018,
      },
      zoom: 17,
      show: false,
      errors: {},
    };
  }

  currentLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState((prevState) => ({
          location: {
            ...prevState.currentLatLng,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          zoom: 17,
          show: true,
        }));
      });
    }
  };

  componentWillMount() {
    this.props.getPosts();
    this.props.recommendPost();
    this.currentLocationRequest();
    document.body.classList.add("Background-Yellow");
  }

  componentDidMount() {
    document.title = "Paku - Rent";
  }

  componentWillUnmount() {
    document.body.classList.remove("Background-Yellow");
  }

  componentWillReceiveProps(nextProps) {
    const posts = nextProps.post.posts;
    const recommendposts = nextProps.post.post_recommend;

    if (posts != null) {
      if (posts.post !== "No have post") {
        if (posts.length !== 0) {
          this.setState({
            places: posts,
          });
        }
      }
    }

    if (recommendposts != null) {
      if (recommendposts.post !== "No have post") {
        if (recommendposts.length !== 0) {
          this.setState({
            recommendset: recommendposts,
          });
        }
      }
    }
  }

  render() {
    const { places } = this.state;
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
          <Responsive
            style={{
              "margin-top": "3rem",
              "margin-left": "-2rem",
              "margin-right": "-2rem",
            }}
          >
            <Container className="mt-4" fluid>
              <Grid centered>
                <Grid.Column
                  mobile={16}
                  tablet={10}
                  computer={9}
                  widescreen={8}
                >
                  <div style={{ height: "85vh", width: "100%" }}>
                    <GoogleMapReact
                      bootstrapURLKeys={{
                        key: `${key}`,
                        language: "th",
                      }}
                      // yesIWantToUseGoogleMapApiInternals
                      // onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, places)}
                      center={this.state.location}
                      zoom={this.state.zoom}
                      options={{ styles }}
                    >
                      {places.map((place, index) => {
                        return (
                          <Popup
                            content={place.location.address}
                            key={index}
                            header={place.title}
                            lat={place.location.latitude}
                            lng={place.location.longitude}
                            trigger={
                              <Link to={`/book/${place._id}`}>
                                <Icon
                                  className="text-decoration-none"
                                  circular
                                  inverted
                                  link
                                  size="large"
                                  name="home"
                                  color="teal"
                                  fitted
                                />
                              </Link>
                            }
                          />
                        );
                      })}

                      {this.state.show && (
                        <Popup
                          header={"คุณอยู่ที่นี่"}
                          lat={this.state.location.lat}
                          lng={this.state.location.lng}
                          trigger={
                            <Icon size="big" name="user" color="blue" fitted />
                          }
                        />
                      )}
                    </GoogleMapReact>
                  </div>
                </Grid.Column>

                <Grid.Column
                  className="mx-4"
                  mobile={16}
                  tablet={5}
                  computer={4}
                  widescreen={3}
                >
                  <Header textAlign="left">
                    <div>
                      <Icon name="map marker alternate"></Icon>
                      ที่จอดรถแนะนำ
                    </div>
                  </Header>
                  {this.state.recommendset.map((post, index) => {
                    return (
                      <Grid.Row key={index}>
                        <NearbyCard
                          photo={post.photos}
                          title={post.title}
                          rate={post.rate.rating}
                          price={post.price}
                          url={`/book/${post._id}`}
                        />
                      </Grid.Row>
                    );
                  })}
                </Grid.Column>
              </Grid>
            </Container>
          </Responsive>
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

export default connect(mapStateToProps, { getPosts, recommendPost })(
  withRouter(Rent)
);
