import React, { Component } from 'react';
import { Responsive, Container, Button, Grid, Header, Divider, Card, Image } from 'semantic-ui-react';
import { getPosts } from '../../redux/actions/postActions';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { storage } from '../../config/firebase-config';

class MyPost extends Component {

  constructor() {
    super();
    this.state = {
      postid: '',
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
        postid: postFind._id,
        title: postFind.title,
        imageurl: postFind.photos[0]
      })
    }


  }


  render() {
    return (
      <Responsive>
        <Container fluid>
          <Grid centered className='mb-4'>
            <Grid.Column mobile={16} tablet={9} computer={9}>

              <Card fluid>
                <Card.Content>

                  {this.state.title}

                  <div className='img-center-square'>
                    <Image
                      src={this.state.imageurl}
                      wrapped
                      ui={false}
                    />
                  </div>
                  <Card.Description textAlign='right'>

                    <Button basic>
                      <Button.Content visible>พักชั่วคราว</Button.Content>
                    </Button>

                    <Button basic>
                      <Button.Content visible>ลบ</Button.Content>
                    </Button>

                    <Button href={`/editpost/${this.state.postid}`} basic>
                      <Button.Content visible>แก้ไข</Button.Content>
                    </Button>

                  </Card.Description>

                </Card.Content>

              </Card>

            </Grid.Column>

          </Grid>

        </Container>
      </Responsive >
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  post: state.post,
  auth: state.auth
})

export default connect(mapStateToProps, { getPosts })(withRouter(MyPost));