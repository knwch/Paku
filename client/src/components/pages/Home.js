import React, { Component } from 'react';
import RecommendCard from '../cards/RecommendCard';
import SearchBox from '../SearchBox';
import { Grid } from 'semantic-ui-react';

class Home extends Component {
  componentDidMount(){
    document.title = "🐤 Paku"
  }
  
  render() {
    return (
      <div>
        <SearchBox />
        <div className="container-fluid">
          <div className="text-left">
            <h4>รู้จักกับ PAKU</h4>
            <p>บริก ารจองที่จอดรถล่วงหน้า
              ที่จะทำให้คุณหมดปัญหาเรื่องหาที่จอดรถไม่ได้
            คุณสามารถจองที่จอดรถล่วงหน้าได้สูงสุด 2 วัน<br />
              ไม่ว่างานสำคัญ หรือจะเที่ยว ก็หายห่วงเรื่องรถได้เลย</p>
          </div>
          <div className="text-left">
            <h4>ที่จอดรถแนะนำ</h4>
          </div>
          <Grid columns={4}>
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