import React, { Component } from 'react';
import { Responsive, Container, Button, Grid, Header, Menu, Divider, Image, Item, Card } from 'semantic-ui-react';
import { getPosts, deletePost } from '../../redux/actions/postActions';
import { getBookUser, cancelBook } from '../../redux/actions/bookActions';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment'
import 'moment/locale/th';

class MyPost extends Component {

  constructor() {
    super();
    this.state = {
      userid: '',
      posts: [],
      books: [],
      activeItem: 'postmenu',
      errors: {}
    };
  }

  componentWillMount() {
    const user = this.props.auth.user;

    if (this.props.auth.isAuthenticated === false) {
      this.props.history.push('/login')
    }

    this.setState({
      userid: user.id
    })

  }

  componentDidMount() {
    document.title = 'Paku - Login';
    this.props.getPosts();
    this.props.getBookUser(this.state.userid);
  }

  componentWillReceiveProps(nextProps) {

    const posts = nextProps.post.posts;
    const user = nextProps.auth.user;
    const books = nextProps.book.bookUser;

    const postsFind = posts.filter((val) => val.user === user.id)

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (postsFind.length !== 0) {
      this.setState({
        posts: postsFind
      })
    }

    if (books.length !== 0) {

      var booksArray = []

      for (var i = 0; i < posts.length; i++) {
        var bookFilter = books.filter((val) => {
          if (val.idPost === posts[i]._id) {
            val.title = posts[i].title
            val.photos = posts[i].photos
            val.address = posts[i].location.address
            return val
          }
        })
        if (bookFilter.length !== 0) {
          bookFilter.map(function (book) {
            booksArray.push(book)
          });
        }
      }

      this.setState({
        books: booksArray
      })

    }

  }

  handleDeletePost = (id) => {
    this.props.deletePost(id)
    window.location.reload(false)
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  showPostList = () => {
    return (
      this.state.posts
        .map((post, index) => {
          return (
            <Card key={index} className='mb-4' fluid>
              <Card.Content>
                <Item.Group>
                  <Item>

                    <div className='mr-4 img-center-square'>
                      <Image
                        src={post.photos[0]}
                        wrapped
                        ui={false}
                      />
                    </div>

                    <Item.Content>
                      <Item.Header href={`/post/${post._id}`}>{post.title}</Item.Header>
                      <Item.Description>{post.location.address}</Item.Description>
                      <Item.Extra>

                        <Button compact basic>
                          <Button.Content visible>พักชั่วคราว</Button.Content>
                        </Button>

                        <Button compact basic onClick={this.handleDeletePost.bind(this, post._id)}>
                          <Button.Content visible>ลบ</Button.Content>
                        </Button>

                        <Button compact href={`/editpost/${post._id}`} basic>
                          <Button.Content visible>แก้ไข</Button.Content>
                        </Button>

                      </Item.Extra>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Card.Content>
            </Card>
          )
        })
    )
  }

  cancelBooking = (postid, bookid) => {
    this.props.cancelBook(postid, bookid.toString())
    // window.location.reload(false)
  }

  showBookList = () => {
    return (
      this.state.books
        .map((book, index) => {
          return (
            <Card key={index} className='mb-4' fluid>
              <Card.Content>
                <Item.Group>
                  <Item>

                    <div className='mr-4 img-center-square'>
                      <Image
                        src={book.photos[0]}
                        wrapped
                        ui={false}
                      />
                    </div>

                    <Item.Content>
                      <Item.Header href={`/post/${book.idPost}`}>{book.title}</Item.Header>
                      <Item.Description>{book.address}</Item.Description>

                      <Divider />

                      <Item.Description>
                        <p>วันที่จอง {moment(new Date(book.bookDate)).format('D MMMM YYYY')}</p>
                        <p>ตั้งแต่เวลา {book.timeIn} จนถึง {book.timeOut}</p>
                      </Item.Description>

                      <Item.Extra>

                        <Button compact basic disabled={book.statusBook === 0} onClick={this.cancelBooking.bind(this, book.idPost, book.id)}>
                          <Button.Content visible>ยกเลิก</Button.Content>
                        </Button>

                        <Button compact basic>
                          <Button.Content visible>เช็คอิน</Button.Content>
                        </Button>

                        <Button compact basic>
                          <Button.Content visible>เช็คเอาท์</Button.Content>
                        </Button>

                      </Item.Extra>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Card.Content>
            </Card>
          )
        })
    )
  }

  render() {

    var rendererList

    if (this.state.activeItem === 'postmenu') {
      rendererList = this.showPostList()
    }
    else if (this.state.activeItem === 'bookmenu') {
      rendererList = this.showBookList()
    }

    return (
      <Responsive>
        <Container fluid>
          <Grid centered className='mb-4'>

            <Grid.Row>
              <Menu pointing secondary fluid>
                <Menu.Item
                  content='การจอง'
                  name='bookmenu'
                  active={this.state.activeItem === 'bookmenu'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  content='การให้เช่า'
                  name='postmenu'
                  active={this.state.activeItem === 'postmenu'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name='รอการยืนยัน'
                />
                <Menu.Item
                  name='ยกเลิกแล้ว'
                />
                <Menu.Item
                  name='รอรีวิว'
                />
                <Menu.Item
                  name='เสร็จสิ้น'
                />
              </Menu>
            </Grid.Row>

            <Grid.Column mobile={16} tablet={9} computer={9}>

              {rendererList}
              {console.log(this.state.books)}

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
  auth: state.auth,
  book: state.book
})

export default connect(mapStateToProps, { getPosts, deletePost, getBookUser, cancelBook })(withRouter(MyPost));