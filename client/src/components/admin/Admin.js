import React, { Component } from "react";
import { Responsive, Container, Grid, Sidebar } from "semantic-ui-react";

class Admin extends Component {

  componentDidMount() {
    document.title = "Paku - Admin";
  }

  render() {
    return (
      <Responsive>
        <Container>
          <Grid>
            hello
            <Sidebar></Sidebar>
          </Grid>
        </Container>
      </Responsive>
    );
  }
}

export default Admin;
