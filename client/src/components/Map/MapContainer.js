import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker, Map } from 'google-maps-react';
import CurrentLocation from './CurrentLocation';

export class MapContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            stores: [{ lat: 47.49855629475769, lng: -122.14184416996333 },
            { latitude: 47.359423, longitude: -122.021071 },
            { latitude: 47.2052192687988, longitude: -121.988426208496 },
            { latitude: 47.6307081, longitude: -122.1434325 },
            { latitude: 47.3084488, longitude: -122.2140121 },
            { latitude: 47.5524695, longitude: -122.0425407 }]
        }

    };

    displayMarkers = () => {
        return this.state.stores.map((store, index) => {
            return <Marker key={index} id={index} position={{
                lat: store.latitude,
                lng: store.longitude
            }}
                onClick={() => console.log("You clicked me!")} />

        })
    };

    state = {
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    handleMapClick = () => {
        console.log("Hello there")
    };

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                        myLatLng: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    }
                );
            })
        } else {
            //browser doesn't support geolocation, set as vancouver
            this.setState({
                    myLatLng: {
                        lat: 49.8527,
                        lng: -123.1207
                    }
                }
            );
        }
    }

    render() {
        return (
            <div class="map-responsive">
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
        );
    }

}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBvzeljl7lR56XZfMcbSpHiPmqZlD0zpDY', //KorrawichK APIKey
    language: 'th'
})(MapContainer);