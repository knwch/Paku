import React, { Component } from 'react';
import { Responsive, Container, Button, Grid, Header, Divider, Transition, Image } from 'semantic-ui-react';
import { getPosts } from '../../redux/actions/postActions';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { storage } from '../../config/firebase-config';

class MyPost extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      imageurl: '',
      errors: {}
    };
  }

  componentDidMount() {
    document.title = 'Paku - Login';
    this.props.getPosts();
  }

  componentWillReceiveProps(nextProps) {

    const posts = nextProps.post.posts;
    const user = nextProps.auth.user;
    const postFind = posts.find((val) => val.user === user.id)

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (postFind != null) {
      this.setState({
        title: postFind.title,
        imageurl: postFind.photos[0]
      })
    }


  }


  render() {
    return (
      <Responsive>
        <Container fluid>
          <Grid className='mb-4'>
            <Grid.Column mobile={16} tablet={10} computer={10}>

                <div className='img-center-square'>
                  <Image
                    src={this.state.imageurl}
                    wrapped
                    ui={false}
                  />
                </div>

                {this.state.title}

                <Button basic>
                  <Button.Content visible>พักชั่วคราว</Button.Content>
                </Button>

                <Button basic>
                  <Button.Content visible>ลบ</Button.Content>
                </Button>

                <Button basic>
                  <Button.Content visible>แก้ไข</Button.Content>
                </Button>

            </Grid.Column>
          </Grid>
        </Container>
      </Responsive>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  post: state.post,
  auth: state.auth
})

export default connect(mapStateToProps, { getPosts })(withRouter(MyPost));