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
      posts: [],
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
    const postsFind = posts.filter((val) => val.user === user.id)

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (postsFind.length !== 0) {
      this.setState({
        posts: postsFind
      })
    }


  }


  render() {
    return (

      <Responsive>
        <Container fluid>
          <Grid centered className='mb-4'>
            <Grid.Column mobile={16} tablet={9} computer={9}>

              {this.state.posts
                .map((post, index) => {
                  return (
                    <div key={index} className='mb-4'>
                      <Card fluid>
                        <Card.Content>

                          {post.title}

                          <div className='img-center-square'>
                            <Image
                              src={post.photos[0]}
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

                            <Button href={`/editpost/${post._id}`} basic>
                              <Button.Content visible>แก้ไข</Button.Content>
                            </Button>

                          </Card.Description>

                        </Card.Content>

                      </Card>
                    </div>
                  )
                })}

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