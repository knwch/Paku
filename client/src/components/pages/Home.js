import React, { Component } from 'react';
import RecommendCard from '../cards/RecommendCard';
import { Grid } from 'semantic-ui-react';
import SearchBox from '../SearchBox';

class Home extends Component {

  componentDidMount() {
    document.title = "Paku - Home"
    document.body.classList.add('Background-Yellow');
  }

  // state = {
  //   modalLogout: false
  // }

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
  
  render() {
    return (
      <div>
        <SearchBox />
        <div className="container-fluid mt-5">
          <div className="text-left mb-4">
            <h4><div>ที่จอดรถแนะนำ</div></h4>
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