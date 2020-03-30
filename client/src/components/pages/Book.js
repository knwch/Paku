import React, { Component } from "react";
import _ from "lodash";
import SimpleReactValidator from "simple-react-validator";
import {
  Responsive,
  Container,
  Button,
  Grid,
  Header,
  Label,
  Divider,
  Image,
  Item,
  Form,
  Icon,
  Card,
  Transition,
  Modal
} from "semantic-ui-react";
import { getPost } from "../../redux/actions/postActions";
import { getBookPost, addBook } from "../../redux/actions/bookActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MapContainer from "../map/MapContainer";
import moment from "moment";
import "moment/locale/th";

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postid: "",
      userid: "",
      renterid: "",
      book_date: "",
      book_start: "",
      book_end: "",
      book_phone: "",
      book_plate: "",
      book_description: "",
      book_payment: "เงินสด",
      book_hours: 0,
      book_price: 0,
      book_start_disabled: [],
      book_end_disabled: [],
      bookeds: [],
      title: "",
      photos: [],
      price: "",
      typeofpark: "",
      numberofcar: "",
      typeofcar: "",
      explain: "",
      rule: [],
      nearby: [],
      facility: [],
      open: "",
      close: "",
      address: "",
      location: {
        lat: null,
        lng: null
      },
      zoom: 15,
      show: true,
      modalOpen: false,
      errors: {},
      times: [
        { text: "00.00", value: "00.00" },
        { text: "00.30", value: "00.30" },
        { text: "01.00", value: "01.00" },
        { text: "01.30", value: "01.30" },
        { text: "02.00", value: "02.00" },
        { text: "02.30", value: "02.30" },
        { text: "03.00", value: "03.00" },
        { text: "03.30", value: "03.30" },
        { text: "04.00", value: "04.00" },
        { text: "04.30", value: "04.30" },
        { text: "05.00", value: "05.00" },
        { text: "05.30", value: "05.30" },
        { text: "06.00", value: "06.00" },
        { text: "06.30", value: "06.30" },
        { text: "07.00", value: "07.00" },
        { text: "07.30", value: "07.30" },
        { text: "08.00", value: "08.00" },
        { text: "08.30", value: "08.30" },
        { text: "09.00", value: "09.00" },
        { text: "09.30", value: "09.30" },
        { text: "10.00", value: "10.00" },
        { text: "10.30", value: "10.30" },
        { text: "11.00", value: "11.00" },
        { text: "11.30", value: "11.30" },
        { text: "12.00", value: "12.00" },
        { text: "12.30", value: "12.30" },
        { text: "13.00", value: "13.00" },
        { text: "13.30", value: "13.30" },
        { text: "14.00", value: "14.00" },
        { text: "14.30", value: "14.30" },
        { text: "15.00", value: "15.00" },
        { text: "15.30", value: "15.30" },
        { text: "16.00", value: "16.00" },
        { text: "16.30", value: "16.30" },
        { text: "17.00", value: "17.00" },
        { text: "17.30", value: "17.30" },
        { text: "18.00", value: "18.00" },
        { text: "18.30", value: "18.30" },
        { text: "19.00", value: "19.00" },
        { text: "19.30", value: "19.30" },
        { text: "20.00", value: "20.00" },
        { text: "20.30", value: "20.30" },
        { text: "21.00", value: "21.00" },
        { text: "21.30", value: "21.30" },
        { text: "22.00", value: "22.00" },
        { text: "22.30", value: "22.30" },
        { text: "23.00", value: "23.00" },
        { text: "23.30", value: "23.30" }
      ]
    };

    this.validator = new SimpleReactValidator({
      validators: {
        thai: {
          // name the rule
          message: ":attribute ภาษาไทย",
          rule: (val, params, validator) => {
            return validator.helpers.testRegex(val, /^[ก-์]*$/i);
          }
        }
      },
      element: message => (
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
        alpha_num: "โปรดระบุเฉพาะตัวอักษรหรือตัวเลขเท่านั้น",
        integer: "โปรดระบุเฉพาะตัวเลขเท่านั้น",
        string: "โปรดระบุเฉพาะตัวอักษรเท่านั้น",
        phone: "โปรดระบุเบอร์โทรศัพท์ 10 หลัก",
        after_or_equal: "จองได้ตั้งแต่วันนี้เป็นต้นไป",
        before_or_equal: "จองล่วงหน้าได้สูงสุด 3 วัน"
      }
    });
  }

  componentDidMount = () => {
    document.title = "Paku - Booking";

    const postid = this.props.match.params.id;
    this.props.getPost(postid);
    this.props.getBookPost(postid);

    this.setState({
      postid: postid
    });
  };

  componentWillReceiveProps(nextProps) {
    const post = nextProps.post.post;
    const user = nextProps.auth.user;
    const book = nextProps.book.bookPost;

    if (book.Book !== "No have booking") {
      const bookFilter = book.filter(val => val.idPost === post._id);
      this.setState({
        bookeds: bookFilter
      });
    }

    if (!_.isEmpty({})) {
      if (user.id === post.user) {
        this.props.history.push(`/post/${post._id}`);
      }
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (user.id) {
      this.setState({
        userid: user.id
      });
    }

    if (post._id) {
      this.setState({
        title: post.title,
        renterid: post.user,
        photos: post.photos,
        price: post.price,
        typeofpark: post.detail.typeofpark,
        numberofcar: post.detail.numberofcar,
        typeofcar: post.detail.typeofcar,
        explain: post.detail.explain,
        rule: post.detail.rule,
        nearby: post.detail.nearby,
        facility: post.detail.facility,
        open: post.date.open,
        close: post.date.close,
        address: post.location.address,
        location: {
          lat: parseFloat(post.location.latitude),
          lng: parseFloat(post.location.longitude)
        }
      });
    }
  }

  handleChange = input => (e, { value }) => {
    if (input === "book_start") {
      this.setState(
        {
          book_start: value,
          book_end: ""
        },
        () => {
          this.handleEndBookingDate();
          this.handleCalculateCost();
        }
      );
    }
    if (input === "book_end") {
      this.setState(
        {
          book_end: value
        },
        () => {
          this.handleCalculateCost();
        }
      );
    }
    this.setState({ [input]: value });
  };

  handleDateChange = input => e => {
    this.setState(
      {
        book_date: e.target.value,
        book_start: "",
        book_end: ""
      },
      () => {
        this.handleStartBookingDate();
      }
    );
  };

  handleCalculateCost = () => {
    var book_start = parseFloat(this.state.book_start);
    var book_end = parseFloat(this.state.book_end);
    if (book_start % 1 !== 0) {
      book_start = book_start + 0.2;
    }
    if (book_end % 1 !== 0) {
      book_end = book_end + 0.2;
    }
    var bookedHours = book_end - book_start;
    var totalCost = bookedHours * parseFloat(this.state.price);

    if (Number.isNaN(totalCost)) {
      this.setState({
        book_hours: 0,
        book_price: 0
      });
    } else {
      this.setState({
        book_hours: bookedHours,
        book_price: totalCost
      });
    }
  };

  handleStartBookingDate = async () => {
    var Array = [];
    const date = this.state.bookeds.filter(date => {
      if (date.bookDate === this.state.book_date && date.statusBook === 1)
        return date;
    });
    for (var i = 0; i < date.length; i++) {
      var start = parseFloat(date[i].timeIn);
      var end = parseFloat(date[i].timeOut);
      if (end % 1 !== 0) {
        end = end + 0.7;
      } else if (end % 1 === 0) {
        end = end + 0.3;
      }
      if (start % 1 !== 0) {
        start = start - 0.3;
      } else if (start % 1 === 0) {
        start = start - 0.7;
      }
      while (start !== end) {
        Array.push(start);
        if (start % 1 !== 0) {
          start = start + 0.7;
        } else if (start % 1 === 0) {
          start = start + 0.3;
        }
      }
    }
    this.setState({
      book_start_disabled: Array
    });
  };

  handleEndBookingDate = async () => {
    var Array = [];
    const date = this.state.bookeds.filter(date => {
      if (date.bookDate === this.state.book_date && date.statusBook === 1)
        return date;
    });
    for (var i = 0; i < date.length; i++) {
      var start = parseFloat(this.state.book_start);
      var end = parseFloat(date[i].timeIn);

      if (start < end) {
        // if (start % 1 !== 0) {
        //     start = start - 0.3
        // } else if (start % 1 === 0) {
        //     start = start - 0.7
        // }

        while (start !== end) {
          Array.push(start);
          if (start % 1 !== 0) {
            start = start + 0.7;
          } else if (start % 1 === 0) {
            start = start + 0.3;
          }
        }
        break;
      }
    }
    if (Array.length === 0) {
      start = parseFloat(this.state.book_start);
      end = parseFloat(this.state.close);

      if (end % 1 !== 0) {
        end = end + 0.7;
      } else if (end % 1 === 0) {
        end = end + 0.3;
      }

      while (start < end) {
        Array.push(start);
        if (start % 1 !== 0) {
          start = start + 0.7;
        } else if (start % 1 === 0) {
          start = start + 0.3;
        }
      }
    }
    this.setState({
      book_end_disabled: Array
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const newBook = {
      bookDate: this.state.book_date,
      timeIn: this.state.book_start,
      timeOut: this.state.book_end,
      phone: this.state.book_phone,
      idCar: this.state.book_plate,
      note: this.state.book_description,
      payment: this.state.book_payment,
      idPost: this.state.postid,
      idUser: this.state.userid,
      renter: this.state.renterid,
      hours: this.state.book_hours.toString(),
      price: this.state.book_price.toString()
    };
    await this.props.addBook(newBook, this.state.postid);
    this.props.history.push("/mypost");
  };

  handleOpenModal = e => {
    if (this.validator.allValid()) {
      e.preventDefault();
      this.setState({ modalOpen: true });
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  };

  handleCloseModal = () => this.setState({ modalOpen: false });

  render() {
    const payments = [{ text: "เงินสด", value: "เงินสด" }];

    // start booking time
    const timeStartOptions = this.state.times
      .filter(
        (
          time //filter times between open and close
        ) =>
          parseFloat(time.value) >= parseFloat(this.state.open) &&
          parseFloat(time.value) < parseFloat(this.state.close)
      )
      .filter(time => {
        return !this.state.book_start_disabled.includes(parseFloat(time.value));
      });

    //end booking time
    const timeEndOptions = this.state.times
      .filter(
        (
          time //filter times between start booking's time and close
        ) =>
          parseFloat(time.value) > parseFloat(this.state.book_start) &&
          parseFloat(time.value) <= parseFloat(this.state.close)
      )
      .filter(time => {
        return this.state.book_end_disabled.includes(parseFloat(time.value));
      });

    return (
      <Responsive>
        <Container fluid>
          <Grid centered className="mb-4">
            <Grid.Row>
              {this.state.photos.map((photo, index) => {
                return (
                  <div key={index} className="mb-3 mr-4 img-center-240">
                    <Image src={photo} wrapped ui={false} />
                  </div>
                );
              })}
            </Grid.Row>
            <Grid.Column mobile={16} tablet={7} computer={7}>
              <Card fluid>
                <Card.Content>
                  <Form>
                    <Header as="h3">
                      <div>จองที่จอดรถ</div>
                    </Header>
                    <Form.Input className="mt-3 mb-0" fluid>
                      <input
                        type="date"
                        value={this.state.book_date}
                        onChange={this.handleDateChange("book_date")}
                      />
                    </Form.Input>
                    {this.validator.message(
                      "วันที่จอง",
                      this.state.book_date &&
                        moment(this.state.book_date, "YYYY-MM-DD"),
                      [
                        "required",
                        { after_or_equal: moment() },
                        { before_or_equal: moment().add(3, "day") }
                      ]
                    )}
                    <Form.Group className="mt-3 mb-0" widths="equal">
                      <Form.Dropdown
                        fluid
                        search
                        selection
                        lazyLoad
                        placeholder="ตั้งแต่"
                        onChange={this.handleChange("book_start")}
                        value={this.state.book_start}
                        options={timeStartOptions}
                        disabled={this.state.book_date === ""}
                      />
                      <Form.Dropdown
                        fluid
                        search
                        selection
                        lazyLoad
                        placeholder="จนถึง"
                        onChange={this.handleChange("book_end")}
                        value={this.state.book_end}
                        options={timeEndOptions}
                        disabled={this.state.book_start === ""}
                      />
                    </Form.Group>
                    {this.validator.message(
                      "เวลาเริ่ม",
                      this.state.book_start,
                      "required"
                    )}
                    {this.validator.message(
                      "เวลาสิ้นสุด",
                      this.state.book_end,
                      "required"
                    )}
                    <Header as="h3">
                      <div>รายละเอียดของคุณ</div>
                    </Header>
                    <Form.Group className="mt-3 mb-0" widths="equal">
                      <Form.Input
                        fluid
                        placeholder="เบอร์ติดต่อ"
                        onChange={this.handleChange("book_phone")}
                        input={{
                          maxlength: "10"
                        }}
                        value={this.state.book_phone}
                      />
                      <Form.Input
                        fluid
                        placeholder="ทะเบียนรถ"
                        onChange={this.handleChange("book_plate")}
                        value={this.state.book_plate}
                      />
                    </Form.Group>
                    {this.validator.message(
                      "เบอร์ติดต่อ",
                      this.state.book_phone,
                      "required|phone"
                    )}
                    {this.validator.message(
                      "ทะเบียนรถ",
                      this.state.book_plate,
                      "required"
                    )}
                    <Form.Input
                      className="mt-3 mb-0"
                      fluid
                      placeholder="หมายเหตุถึงเจ้าของที่จอดรถ"
                      onChange={this.handleChange("book_description")}
                      value={this.state.book_description}
                    />
                    <Header as="h3">
                      <div>รายละเอียดของคุณ</div>
                    </Header>
                    <Form.Dropdown
                      className="mt-3 mb-0"
                      fluid
                      selection
                      placeholder="จนถึง"
                      onChange={this.handleChange("book_payment")}
                      value={this.state.book_payment}
                      options={payments}
                    />

                    <Divider className="mt-4 mb-4" />

                    <Item.Group>
                      <Item>
                        <Item.Content>
                          <Item.Description>
                            ราคาที่จอดรถ {this.state.price} บาท / ชั่วโมง
                          </Item.Description>
                          <Item.Description>
                            จำนวน {this.state.book_hours} ชั่วโมง
                          </Item.Description>
                          <Item.Description>
                            ราคารวม {this.state.book_price} บาท
                          </Item.Description>
                        </Item.Content>
                      </Item>
                    </Item.Group>

                    <Button
                      onClick={this.handleOpenModal}
                      disabled={!this.props.auth.isAuthenticated}
                      className="btn-paku"
                      color="yellow"
                      floated="right"
                    >
                      <Button.Content visible>จองทันที</Button.Content>
                    </Button>
                  </Form>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Modal
              open={this.state.modalOpen}
              className="modal-paku"
              size="tiny"
            >
              <Modal.Content>
                <Header
                  icon="calendar alternate"
                  content="ตรวจสอบความถูกต้อง"
                />
                <Divider />
                <Modal.Description>
                  <p>
                    วันที่จอง{" "}
                    {moment(new Date(this.state.book_date)).format(
                      "D MMMM YYYY"
                    )}
                  </p>
                  <p>
                    ตั้งแต่เวลา {this.state.book_start} จนถึง{" "}
                    {this.state.book_end}
                  </p>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button basic onClick={this.handleCloseModal}>
                  <text>ยกเลิก</text>
                </Button>
                <Button className="btn-paku" onClick={this.handleSubmit}>
                  <Icon name="checkmark" /> <text>ยืนยัน</text>
                </Button>
              </Modal.Actions>
            </Modal>

            <Grid.Column mobile={16} tablet={7} computer={7}>
              <Item.Group>
                <Item>
                  <Item.Content>
                    <Item.Header>
                      <div>{this.state.title}</div>
                    </Item.Header>
                    <Item.Description>{this.state.address}</Item.Description>
                  </Item.Content>
                </Item>

                <Divider />

                <Item>
                  <Item.Content>
                    <Item.Header>
                      <div>ประเภทที่สามารถจอดได้</div>
                    </Item.Header>
                    <Item.Description>{this.state.typeofpark}</Item.Description>
                    <Item.Description>
                      จำนวนที่จอดรถ {this.state.numberofcar} คัน
                    </Item.Description>
                  </Item.Content>
                </Item>

                <Item>
                  <Item.Content>
                    <Item.Header>
                      <div>ประเภทที่จอดรถ</div>
                    </Item.Header>
                    <Item.Description>{this.state.typeofcar}</Item.Description>
                  </Item.Content>
                </Item>

                <Item>
                  <Item.Content>
                    <Item.Header>
                      <div>ช่วงเวลาที่เปิดให้บริการ</div>
                    </Item.Header>
                    <Item.Description>
                      ตั้งแต่ {this.state.open} จนถึง {this.state.close}
                    </Item.Description>
                  </Item.Content>
                </Item>

                <Divider />

                <Item>
                  <Item.Content>
                    <Item.Header>
                      <div>คำอธิบายที่จอดรถ</div>
                    </Item.Header>
                    <Item.Description>{this.state.explain}</Item.Description>
                  </Item.Content>
                </Item>

                <Item>
                  <Item.Content>
                    <Item.Header>
                      <div>กฎที่จอดรถ</div>
                    </Item.Header>
                    {(() => {
                      if (this.state.rule.length === 0) {
                        return <Item.Description>ไม่ระบุ</Item.Description>;
                      }
                    })()}
                    {this.state.rule.map((rule, index) => {
                      return (
                        <Item.Description key={index}>{rule}</Item.Description>
                      );
                    })}
                  </Item.Content>
                </Item>
                <Item>
                  <Item.Content>
                    <Item.Header>
                      <div>สถานที่ใกล้เคียง</div>
                    </Item.Header>
                    {(() => {
                      if (this.state.nearby.length === 0) {
                        return <Item.Description>ไม่ระบุ</Item.Description>;
                      }
                    })()}
                    {this.state.nearby.map((nearby, index) => {
                      return (
                        <Item.Description key={index}>
                          {nearby}
                        </Item.Description>
                      );
                    })}
                  </Item.Content>
                </Item>

                <Item>
                  <Item.Content>
                    <Item.Header>
                      <div>สิ่งอำนวยความสะดวก</div>
                    </Item.Header>
                    {(() => {
                      if (this.state.facility.length === 0) {
                        return <Item.Description>ไม่ระบุ</Item.Description>;
                      }
                    })()}
                    {this.state.facility.map((facility, index) => {
                      return (
                        <Item.Description key={index}>
                          {facility}
                        </Item.Description>
                      );
                    })}
                  </Item.Content>
                </Item>

                <Divider />

                <Item>
                  <Item.Content>
                    <MapContainer
                      center={this.state.location}
                      lat={this.state.location.lat}
                      lng={this.state.location.lng}
                      zoom={this.state.zoom}
                      show={this.state.show}
                      height={"40vh"}
                    />
                  </Item.Content>
                </Item>
              </Item.Group>
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
  book: state.book,
  auth: state.auth
});

export default connect(mapStateToProps, { getPost, getBookPost, addBook })(
  withRouter(Book)
);
