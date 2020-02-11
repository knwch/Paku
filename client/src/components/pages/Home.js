import React, { Component } from 'react';
import RecommendCard from '../cards/RecommendCard';
import SearchBox from '../SearchBox';
import { Grid } from 'semantic-ui-react';

class Home extends Component {

  componentDidMount() {
    document.title = "🐤 Paku"
    document.body.classList.add('Background-Yellow');
  }
  
  render() {
    return (
      <div>
        <SearchBox />
        <div className="container-fluid mt-5">
          <div className="text-left mb-4">
            <h4>ที่จอดรถแนะนำ</h4>
          </div>
          <Grid textAlign='center' columns={4}>
            <Grid.Row>
              <Grid.Column mobile={16} tablet={4} computer={4}>
                <RecommendCard />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={4} computer={4}>
                <RecommendCard />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={4} computer={4}>
                <RecommendCard />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={4} computer={4}>
                <RecommendCard />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Home;