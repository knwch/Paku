import React, { Component } from 'react';
import MapContainer from '../components/Map/MapContainer';
import NearbyCard from '../components/cards/NearbyCard';
import { Grid, Responsive, Container } from 'semantic-ui-react';

class Rent extends Component {
    render() {
        return (
            <Responsive>
                <Container fluid>
                    <Grid>
                        <Grid.Column mobile={16} tablet={10} computer={11}>
                            <MapContainer />
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
            </Responsive>
        );
    }
}

export default Rent;