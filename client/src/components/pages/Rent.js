import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import styles from "../map/mapStyles";
import NearbyCard from "../cards/NearbyCard";
import NavMenu from "../NavMenu";
import Footer from "../Footer";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getPosts } from "../../redux/actions/postActions";
import { Grid, Responsive, Container, Icon, Popup, Modal, Loader } from "semantic-ui-react";

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
      location: {
        lat: 13.7563,
        lng: 100.5018,
      },
      zoom: 17,
      show: false,
      errors: {},
    };
  }

  componentWillMount() {
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
  }

  componentDidMount() {
    document.title = "Paku - Rent";

    this.props.getPosts();
  }

  componentWillReceiveProps(nextProps) {
    const posts = nextProps.post.posts;

    if (posts.length !== 0) {
      this.setState({
        places: posts,
      });
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
          <Container fluid>
            <Grid>
              <Grid.Column mobile={16} tablet={10} computer={11}>
                <div style={{ height: "100vh", width: "100%" }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyCf6-elScNOgfdze15ermTJF5EynmGudZM",
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

              <Grid.Column mobile={16} tablet={6} computer={5}>
                <Grid.Row>
                  <NearbyCard />
                </Grid.Row>
                <Grid.Row>
                  <NearbyCard />
                </Grid.Row>
                <Grid.Row>
                  <NearbyCard />
                </Grid.Row>
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
});

export default connect(mapStateToProps, { getPosts })(withRouter(Rent));
