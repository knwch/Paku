import React, { Component } from "react";
import {
  Responsive,
  Container,
  Button,
  Grid,
  Header,
  Menu,
  Divider,
  Image,
  Item,
  Card,
  Modal,
  Loader,
  Rating,
  Input,
  Transition,
  Label,
  Icon,
} from "semantic-ui-react";
import {
  getPosts,
  deletePost,
  availablePost,
  addComment,
} from "../../redux/actions/postActions";
import { getProfiles } from "../../redux/actions/profileActions";
import {
  getBookUser,
  cancelBook,
  checkBook,
  getBookPost,
} from "../../redux/actions/bookActions";
import NavMenu from "../NavMenu";
import Footer from "../Footer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import moment from "moment";
import "moment/locale/th";

class MyPost extends Component {
  constructor() {
    super();
    this.state = {
      userid: "",
      posts: [],
      users: [],
      bookuser: [],
      bookuser_temp: [],
      bookpost: [],
      activeItem: "bookmenu",
      errors: {},
      modalBookOpen: false,
      modalPostOpen: false,
      modalCheckOutOpen: false,
      temp_bookdata: null,
      temp_postdata: null,
      temp_checkoutdata: null,
      rating: "",
      comment: "",
    };

    this.validator = new SimpleReactValidator({
      element: (message) => (
        <div className="mb-2">
          <Transition animation="shake" duration={250} transitionOnMount={true}>
            <Label basic color="red" pointing>
              {message}
            </Label>
          </Transition>
          <br />
        </div>
      ),
      messages: {
        required: "โปรดระบุ:attribute",
      },
    });
  }

  componentWillMount() {
    const user = this.props.auth.user;

    this.props.getPosts();
    this.props.getProfiles();

    if (this.props.auth.isAuthenticated === false) {
      this.props.history.push("/login");
    }

    this.setState({
      userid: user.id,
    });
  }

  componentDidMount() {
    document.title = "Paku - My Post";
  }

  componentWillReceiveProps(nextProps) {
    const profiles = nextProps.profile.profiles;
    const posts = nextProps.post.posts;
    const user = nextProps.auth.user;
    const bookuser = nextProps.book.bookUser;
    const bookpost = nextProps.book.bookPost;

    if (posts !== null) {
      var postsFind = posts.filter((val) => val.user === user.id);
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (postsFind !== null) {
      this.setState({
        posts: postsFind,
      });
    }

    if (profiles !== null) {
      this.setState({
        users: profiles,
      });
    }

    if (bookuser != null) {
      if (bookuser.Book !== "No have booking") {
        bookuser.forEach((book) => {
          posts.forEach((post) => {
            if (book.idUser === this.state.userid) {
              if (book.idPost === post._id) {
                book.title = post.title;
                book.photos = post.photos;
                book.address = post.location.address;
                this.state.bookuser.push(book);
              }
            }
          });
        });

        bookuser.forEach((book) => {
          this.state.bookuser_temp.push(book);
        });

        // for (var i = 0; i < posts.length; i++) {
        //   var bookFilter = bookuser.filter((val) => {
        //     if (val.idPost === posts[i]._id) {
        //       val.title = posts[i].title
        //       val.photos = posts[i].photos
        //       val.address = posts[i].location.address
        //       return val
        //     }
        //   })
        //   if (bookFilter.length !== 0) {
        //     bookFilter.map((book) => {
        //       booksArray.push(book)
        //     });
        //   }
        // }

        // this.setState({
        //   bookuser: booksArray
        // })
      }
    }

    if (bookpost != null) {
      if (bookpost.Book !== "No have booking") {
        bookpost.forEach((book) => {
          this.state.posts.forEach((post) => {
            if (post._id === book.idPost) {
              book.title = post.title;
              book.address = post.location.address;
              return book;
            }
          });
          this.state.users.forEach((profile) => {
            if (profile._id === book.idUser) {
              book.name = profile.name;
              book.photo = profile.photo_user;
              return book;
            }
          });
        });

        // // if (bookuser.length !== 0) {
        // //   if (bookuser.Book !== 'No have booking') {
        // bookpost.forEach(book => {
        //   // bookuser.forEach(user => {
        //   // if (user.id === book.id) {
        //   console.log(book)
        //   // book.check = user.timeIn
        //   // return book
        //   // }
        //   // })
        // })
        // //   }
        // // }

        bookpost.map((book) => {
          this.state.bookpost.push(book);
        });
      }
    }

    var uniqueBookPost = [...new Set(this.state.bookpost)];
    this.setState({
      bookpost: uniqueBookPost,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.posts.length !== this.state.posts.length) {
      this.state.posts.forEach((post) => {
        this.props.getBookPost(post._id);
      });
    }

    if (prevState.users.length !== this.state.users.length) {
      this.state.users.forEach((user) => {
        this.props.getBookUser(user._id);
      });
    }
  }

  handleDeletePost = (id) => {
    this.setState({ temp_postdata: null, modalPostOpen: false });
    this.props.deletePost(id);
  };

  handlePausePost = (bool, id) => {
    const newAvailable = {
      available: bool,
    };
    this.props.availablePost(newAvailable, id);
  };

  handleOpenModal = () => {
    this.setState({ modalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ modalOpen: false });
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  showPostList = () => {
    if (this.state.posts.length === 0) {
      return (
        <div className="text-center">คุณยังไม่มีที่จอดรถให้เช่าในขณะนี้</div>
      );
    } else if (this.state.posts.length > 0) {
      return this.state.posts.map((post, index) => {
        return (
          <Card key={index} className="mb-4" fluid>
            <Card.Content>
              <Item.Group>
                <Item>
                  <div className="mr-4 img-center-square">
                    <Image src={post.photos[0]} wrapped ui={false} />
                  </div>

                  <Item.Content>
                    <Item.Header href={`/post/${post._id}`}>
                      {post.title}
                    </Item.Header>

                    {(() => {
                      if (post.rate.rating !== 0) {
                        if (post.rate.rating <= 2.5) {
                          return (
                            <Item.Description>
                              <Icon fitted name="yellow star half" />{" "}
                              {post.rate.rating.toFixed(1)}
                            </Item.Description>
                          );
                        } else if (post.rate.rating > 2.5) {
                          return (
                            <Item.Description>
                              <Icon fitted name="yellow star" />{" "}
                              {post.rate.rating.toFixed(1)}
                            </Item.Description>
                          );
                        }
                      } else {
                        return (
                          <Item.Description>
                            <Icon fitted name="yellow star outline" />{" "}
                            ไม่มีคะแนน
                          </Item.Description>
                        );
                      }
                    })()}

                    <Item.Description>{post.location.address}</Item.Description>

                    <Item.Description>
                      <p>
                        เปิดตั้งแต่เวลา {post.date.open} จนถึง {post.date.close}
                      </p>
                    </Item.Description>

                    <Divider />

                    <Item.Extra>
                      <Button
                        compact
                        className="btn-paku-light"
                        hidden={post.available}
                        onClick={this.handlePausePost.bind(
                          this,
                          post.available,
                          post._id
                        )}
                      >
                        <Button.Content visible>เปิดให้เช่า</Button.Content>
                      </Button>

                      <Button
                        compact
                        basic
                        hidden={!post.available}
                        onClick={this.handlePausePost.bind(
                          this,
                          post.available,
                          post._id
                        )}
                      >
                        <Button.Content visible>พักชั่วคราว</Button.Content>
                      </Button>

                      <Button
                        compact
                        basic
                        onClick={() => {
                          this.setState({
                            temp_postdata: post,
                            modalPostOpen: true,
                          });
                        }}
                      >
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
        );
      }, this);
    }
  };

  cancelBooking = (postid, bookid) => {
    this.props.cancelBook(postid, bookid.toString());
    window.location.reload(false);
  };

  handleRate = (e, { rating, maxRating }) =>
    this.setState({ rating, maxRating });

  handleCheckInOut = async (bookid, bool) => {
    const checkData = {
      check: bool,
    };
    await this.props.checkBook(bookid, checkData);
    window.location.reload(false);
  };

  handleCommentChange = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };

  onSubmitCheckOut = (e, { postid, checkid }) => {
    if (this.validator.allValid()) {
      e.preventDefault();
      this.setState({
        modalCheckOutOpen: false,
      });
      const checkData = {
        check: false,
      };
      const newComment = {
        comment: this.state.comment,
        rate: this.state.rating,
      };
      this.props.checkBook(checkid, checkData);
      this.props.addComment(postid, newComment);
      window.location.reload(false);
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  };

  showBookList = () => {
    if (
      this.state.bookuser.filter(
        (val) => val.statusBook === 1 && val.check.checkOutStatus === false
      ).length === 0
    ) {
      return (
        <div className="text-center">คุณยังไม่มีการจองที่จอดรถในขณะนี้</div>
      );
    } else {
      return this.state.bookuser.map((book, index) => {
        if (book.statusBook === 1 && book.check.checkOutStatus === false)
          return (
            <Card key={index} className="mb-4" fluid>
              <Card.Content>
                <Item.Group>
                  <Item>
                    <div className="mr-4 img-center-square">
                      <Image src={book.photos[0]} wrapped ui={false} />
                    </div>

                    <Item.Content>
                      <Item.Header href={`/post/${book.idPost}`}>
                        {book.title}
                      </Item.Header>
                      <Item.Description>{book.address}</Item.Description>

                      <Divider />

                      <Item.Description>
                        <p>
                          วันที่จอง{" "}
                          {moment(new Date(book.bookDate)).format(
                            "D MMMM YYYY"
                          )}
                        </p>
                        <p>
                          ตั้งแต่เวลา {book.timeIn} จนถึง {book.timeOut}
                        </p>
                      </Item.Description>

                      <Item.Extra>
                        {(() => {
                          if (book.check.checkInUser === false) {
                            return (
                              <Button
                                compact
                                className="btn-paku"
                                onClick={this.handleCheckInOut.bind(
                                  this,
                                  book.check.id,
                                  true
                                )}
                              >
                                <Button.Content visible>เช็คอิน</Button.Content>
                              </Button>
                            );
                          }
                        })()}

                        {(() => {
                          if (
                            book.check.checkInUser === true &&
                            book.check.checkInRenter === true &&
                            book.check.checkOutUser === false
                          ) {
                            return (
                              <Button
                                compact
                                className="btn-paku-light"
                                onClick={() => {
                                  this.setState({
                                    temp_checkoutdata: book,
                                    modalCheckOutOpen: true,
                                  });
                                }}
                              >
                                <Button.Content visible>
                                  เช็คเอาท์
                                </Button.Content>
                              </Button>
                            );
                          } else if (
                            book.check.checkInUser === true &&
                            book.check.checkInRenter === false
                          ) {
                            return (
                              <Button compact disabled>
                                <Button.Content visible>
                                  รอการยืนยัน
                                </Button.Content>
                              </Button>
                            );
                          } else if (
                            book.check.checkOutUser === true &&
                            book.check.checkOutRenter === false
                          ) {
                            return (
                              <Button basic compact disabled>
                                <Button.Content visible>
                                  เช็คเอาท์สำเร็จ
                                </Button.Content>
                              </Button>
                            );
                          }
                        })()}

                        {(() => {
                          if (book.check.checkInUser === false) {
                            return (
                              <Button
                                compact
                                basic
                                onClick={() => {
                                  this.setState({
                                    temp_bookdata: book,
                                    modalBookOpen: true,
                                  });
                                }}
                              >
                                <Button.Content visible>ยกเลิก</Button.Content>
                              </Button>
                            );
                          }
                        })()}
                      </Item.Extra>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Card.Content>
            </Card>
          );
      }, this);
    }
  };

  showWaitList = () => {
    const { bookpost, bookuser_temp } = this.state;

    bookpost.forEach((book) => {
      bookuser_temp.forEach((user) => {
        if (book.id === user.id) {
          book.check = user.check;
        }
      });
    });

    if (
      bookpost.filter(
        (val) => val.statusBook === 1 && val.check.checkOutStatus === false
      ).length === 0
    ) {
      return (
        <div className="text-center">
          คุณยังไม่มีการจองที่รอการยืนยันจากคุณในขณะนี้
        </div>
      );
    } else {
      return bookpost
        .filter(
          (val) => val.statusBook === 1 && val.check.checkOutStatus === false
        )
        .map((book, index) => {
          if (book.check == null) {
            this.setState({
              activeItem: "postmenu",
            });
          } else {
            return (
              <Card key={index} className="mb-4" fluid>
                <Card.Content>
                  <Item.Group>
                    <Item>
                      <div className="mr-4 img-center-square">
                        <Image src={book.photo} wrapped ui={false} />
                      </div>

                      <Item.Content>
                        <Item.Header>
                          {book.name.firstname} {book.name.lastname}
                        </Item.Header>
                        <Item.Description>{book.title}</Item.Description>
                        <Item.Extra>{book.address}</Item.Extra>

                        <Divider />

                        <Item.Description>
                          <p>
                            วันที่จอง{" "}
                            {moment(new Date(book.bookDate)).format(
                              "D MMMM YYYY"
                            )}
                          </p>
                          <p>
                            ตั้งแต่เวลา {book.timeIn} จนถึง {book.timeOut}
                          </p>
                        </Item.Description>

                        <Item.Extra>
                          {(() => {
                            if (
                              book.check.checkInUser === true &&
                              book.check.checkInRenter === false
                            ) {
                              return (
                                <Button
                                  compact
                                  className="btn-paku"
                                  onClick={this.handleCheckInOut.bind(
                                    this,
                                    book.check.id,
                                    true
                                  )}
                                >
                                  <Button.Content visible>
                                    ยืนยันการเช็คอิน
                                  </Button.Content>
                                </Button>
                              );
                            } else if (
                              book.check.checkInRenter === true &&
                              book.check.checkOutUser === false
                            ) {
                              return (
                                <Button compact basic disabled>
                                  <Button.Content visible>
                                    ยืนยันแล้ว
                                  </Button.Content>
                                </Button>
                              );
                            } else if (
                              book.check.checkOutUser === true &&
                              book.check.checkOutRenter === false
                            ) {
                              return (
                                <Button
                                  compact
                                  className="btn-paku-light"
                                  onClick={this.handleCheckInOut.bind(
                                    this,
                                    book.check.id,
                                    false
                                  )}
                                >
                                  <Button.Content visible>
                                    ยืนยันการเช็คเอาท์
                                  </Button.Content>
                                </Button>
                              );
                            }
                          })()}
                        </Item.Extra>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Card.Content>
              </Card>
            );
          }
        }, this);
    }
  };

  showCompleteList = () => {
    if (
      this.state.bookuser.filter(
        (val) => val.statusBook === 0 || val.check.checkOutStatus === true
      ).length === 0
    ) {
      return <div className="text-center">คุณยังไม่มีการจองที่เสร็จสิ้น</div>;
    } else {
      return this.state.bookuser.map((book, index) => {
        if (book.statusBook === 0 || book.check.checkOutStatus === true)
          return (
            <Card key={index} className="mb-4" fluid>
              <Card.Content>
                <Item.Group>
                  <Item>
                    <div className="mr-4 img-center-square">
                      <Image src={book.photos[0]} wrapped ui={false} />
                    </div>

                    <Item.Content>
                      <Item.Header href={`/post/${book.idPost}`}>
                        {book.title}
                      </Item.Header>
                      <Item.Description>{book.address}</Item.Description>

                      <Divider />

                      <Item.Description>
                        <p>
                          วันที่จองเมื่อ{" "}
                          {moment(new Date(book.bookDate)).format(
                            "D MMMM YYYY"
                          )}
                        </p>
                        <p>
                          ตั้งแต่เวลา {book.timeIn} จนถึง {book.timeOut}
                        </p>
                      </Item.Description>

                      {(() => {
                        if (book.statusBook === 0) {
                          return <Item.Meta>ยกเลิกแล้ว</Item.Meta>;
                        } else if (book.check.checkOutStatus === true) {
                          return <Item.Meta>ทำรายการสำเร็จ</Item.Meta>;
                        }
                      })()}
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Card.Content>
            </Card>
          );
      });
    }
  };

  render() {
    var rendererList;
    var modalPopup;

    if (this.state.activeItem === "postmenu") {
      rendererList = this.showPostList();
    }
    if (this.state.activeItem === "bookmenu") {
      rendererList = this.showBookList();
    }
    if (this.state.activeItem === "completemenu") {
      rendererList = this.showCompleteList();
    }
    if (this.state.activeItem === "waitmenu") {
      rendererList = this.showWaitList();
    }

    if (this.state.temp_bookdata !== null) {
      modalPopup = (
        <Modal
          open={this.state.modalBookOpen}
          className="modal-paku"
          size="tiny"
        >
          <Modal.Content>
            <Header
              icon="delete calendar"
              content="คุณต้องการยกเลิกใช่หรือไม่"
            />
            <Divider />
            <Modal.Description>
              <p>
                วันที่จอง{" "}
                {moment(new Date(this.state.temp_bookdata.bookDate)).format(
                  "D MMMM YYYY"
                )}
              </p>
              <p>
                ตั้งแต่เวลา {this.state.temp_bookdata.timeIn} จนถึง{" "}
                {this.state.temp_bookdata.timeOut}
              </p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              basic
              onClick={() => {
                this.setState({ temp_bookdata: null, modalBookOpen: false });
              }}
            >
              <text>กลับ</text>
            </Button>
            <Button
              className="btn-paku"
              onClick={this.cancelBooking.bind(
                this,
                this.state.temp_bookdata.idPost,
                this.state.temp_bookdata.id
              )}
            >
              <text>ยืนยัน</text>
            </Button>
          </Modal.Actions>
        </Modal>
      );
    }

    if (this.state.temp_postdata !== null) {
      modalPopup = (
        <Modal
          open={this.state.modalPostOpen}
          className="modal-paku"
          size="tiny"
        >
          <Modal.Content>
            <Header icon="delete" content="คุณต้องการลบใช่หรือไม่" />
          </Modal.Content>
          <Modal.Actions>
            <Button
              basic
              onClick={() => {
                this.setState({ temp_postdata: null, modalPostOpen: false });
              }}
            >
              <text>กลับ</text>
            </Button>
            <Button
              className="btn-paku"
              onClick={this.handleDeletePost.bind(
                this,
                this.state.temp_postdata._id
              )}
            >
              <text>ลบ</text>
            </Button>
          </Modal.Actions>
        </Modal>
      );
    }

    if (this.state.temp_checkoutdata !== null) {
      modalPopup = (
        <Modal
          open={this.state.modalCheckOutOpen}
          className="modal-paku"
          size="tiny"
        >
          <Header icon="calendar check" content="กรุณาให้คะแนนความพึงพอใจ" />
          <Modal.Content className="text-center">
            <Rating
              icon="star"
              maxRating={5}
              onRate={this.handleRate}
              size="massive"
              className="pt-2 pb-4"
            />

            {this.validator.message("คะแนน", this.state.rating, "required")}

            <Divider />

            <Header icon="comment" content="ความคิดเห็นเพิ่มเติม" />
            <Input
              placeholder="ความคิดเห็นของคุณเกี่ยวกับที่จอดรถ"
              onChange={this.handleCommentChange}
              fluid
            />
          </Modal.Content>
          <Modal.Actions>
            <Button
              basic
              onClick={() => {
                this.setState({
                  temp_checkoutdata: null,
                  modalCheckOutOpen: false,
                  rating: "",
                  comment: "",
                });
              }}
            >
              <text>กลับ</text>
            </Button>
            <Button
              className="btn-paku"
              onClick={(e) => {
                this.onSubmitCheckOut(e, {
                  postid: this.state.temp_checkoutdata.idPost,
                  checkid: this.state.temp_checkoutdata.check.id,
                });
              }}
            >
              <text>ยืนยัน</text>
            </Button>
          </Modal.Actions>
        </Modal>
      );
    }

    const { book, loading } = this.props.book;
    if (book === null || loading) {
      return (
        <Modal open={true} className="modal-paku" size="mini" basic>
          <Loader size="large" active inline="centered">
            <p>โปรดรอสักครู่</p>
          </Loader>
        </Modal>
      );
    } else {
      return (
        <Responsive>
          <NavMenu />
          <Container fluid>
            <Grid centered className="mb-4">
              <Grid.Row>
                <Menu pointing secondary fluid>
                  <Menu.Item
                    content="การจอง"
                    name="bookmenu"
                    active={this.state.activeItem === "bookmenu"}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    content="การให้เช่า"
                    name="postmenu"
                    active={this.state.activeItem === "postmenu"}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    content="รอการยืนยัน"
                    name="waitmenu"
                    active={this.state.activeItem === "waitmenu"}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    content="เสร็จสิ้น"
                    name="completemenu"
                    active={this.state.activeItem === "completemenu"}
                    onClick={this.handleItemClick}
                  />
                </Menu>
              </Grid.Row>

              <Grid.Column mobile={16} tablet={9} computer={9}>
                {rendererList}
              </Grid.Column>
            </Grid>

            {modalPopup}
          </Container>
          <Footer />
        </Responsive>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  post: state.post,
  auth: state.auth,
  profile: state.profile,
  book: state.book,
});

export default connect(mapStateToProps, {
  getProfiles,
  getPosts,
  deletePost,
  getBookUser,
  cancelBook,
  availablePost,
  checkBook,
  getBookPost,
  addComment,
})(withRouter(MyPost));
