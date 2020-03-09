import React, { Component } from 'react';
import { Responsive, Container, Button, Grid, Header, Label, Divider, Image, Item } from 'semantic-ui-react';
import { getPosts, deletePost } from '../../redux/actions/postActions';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

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

  handleDel = (id) => {
    this.props.deletePost(id)
    window.location.reload(false)
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
                    <Item.Group link href={`/post/${post._id}`}>
                      <Item key={index}>

                        <div className='mr-4 img-center-square'>
                          <Image
                            src={post.photos[0]}
                            wrapped
                            ui={false}
                          />
                        </div>

                        <Item.Content>
                          <Item.Header>{post.title}</Item.Header>
                          <Item.Description>{post.location.address}</Item.Description>
                          <Item.Extra>

                            <Button compact basic>
                              <Button.Content visible>พักชั่วคราว</Button.Content>
                            </Button>

                            <Button compact basic onClick={this.handleDel.bind(this, post._id)}>
                              <Button.Content visible>ลบ</Button.Content>
                            </Button>

                            <Button compact href={`/editpost/${post._id}`} basic>
                              <Button.Content visible>แก้ไข</Button.Content>
                            </Button>

                          </Item.Extra>
                        </Item.Content>
                      </Item>
                      <Divider />
                    </Item.Group>
                  
                    )
              })}

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

export default connect(mapStateToProps, { getPosts, deletePost })(withRouter(MyPost));