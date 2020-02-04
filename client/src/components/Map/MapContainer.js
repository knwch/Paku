import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import styles from './mapStyles';
import Marker from './Marker';

class MapContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentlocation: {
                lat: 13.7563,
                lng: 100.5018
            },
            zoom: 16,
            show: false
        }
    };

    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         stores: [{ lat: 47.49855629475769, lng: -122.14184416996333 },
    //         { latitude: 47.359423, longitude: -122.021071 },
    //         { latitude: 47.2052192687988, longitude: -121.988426208496 },
    //         { latitude: 47.6307081, longitude: -122.1434325 },
    //         { latitude: 47.3084488, longitude: -122.2140121 },
    //         { latitude: 47.5524695, longitude: -122.0425407 }]
    //     }

    // };

    // displayMarkers = () => {
    //     return this.state.stores.map((store, index) => {
    //         return <Marker key={index} id={index} position={{
    //             lat: store.latitude,
    //             lng: store.longitude
    //         }}
    //             onClick={() => console.log("You clicked me!")} />

    //     })
    // };

    // state = {
    //     showingInfoWindow: false,  //Hides or the shows the infoWindow
    //     activeMarker: {},          //Shows the active marker upon click
    //     selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
    // };

    // onMarkerClick = (props, marker, e) =>
    //     this.setState({
    //         selectedPlace: props,
    //         activeMarker: marker,
    //         showingInfoWindow: true
    //     });

    // onClose = props => {
    //     if (this.state.showingInfoWindow) {
    //         this.setState({
    //             showingInfoWindow: false,
    //             activeMarker: null
    //         });
    //     }
    // };

    // handleMapClick = () => {
    //     console.log("Hello there")
    // };

    // componentDidMount() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition((position) => {
    //             this.setState({
    //                 center: {
    //                     lat: position.coords.latitude,
    //                     lng: position.coords.longitude
    //                 },
    //                 zoom: 15
    //             }
    //             );
    //         })
    //     }
    // };

    handleClickedMap = (e) => {
        var lat = e.latLng.lat()
        var lng = e.latLng.lng()
        console.log(lat, lng)
    }

    componentDidMount = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    console.log(position.coords);
                    this.setState(prevState => ({
                        currentlocation: {
                            ...prevState.currentLatLng,
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        },
                        zoom: 16,
                        show: true
                    }))
                }
            )
        }
    };

    render() {
        return (
            <div class="map-responsive">
                <div style={{ height: '100vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{
                            key: 'AIzaSyBvzeljl7lR56XZfMcbSpHiPmqZlD0zpDY',
                            language: 'th'
                        }}
                        center={this.state.currentlocation}
                        zoom={this.state.zoom}
                        options={{ styles }}
                        onClick={this.handleClickedMap}
                    >
                        {this.state.show &&
                            <Marker
                                lat={this.state.currentlocation.lat}
                                lng={this.state.currentlocation.lng}
                            >
                            </Marker>
                        }

                    </GoogleMapReact>

                    {/* <CurrentLocation centerAroundCurrentLocation google={this.props.google} >

                        <Marker
                            onClick={this.onMarkerClick}
                            name={'current location'}
                            icon={{
                                url: require('../imgs/Logo.png'),
                                scaledSize: new this.props.google.maps.Size(26, 35)
                            }}
                        />
                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                            onClose={this.onClose}
                        >
                            <div>
                                <h4>{this.state.selectedPlace.name}</h4>
                                Hi
                        </div>
                        </InfoWindow>
                    </CurrentLocation>
                    {this.displayMarkers()} */}
                </div>
            </div>
        );
    }

}

export default MapContainer;

// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyBvzeljl7lR56XZfMcbSpHiPmqZlD0zpDY', //KorrawichK APIKey
//     language: 'th'
// })(MapContainer);