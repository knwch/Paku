import React, { Component } from "react";
import { Grid, Search, Item } from "semantic-ui-react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { searchPost } from "../redux/actions/postActions";

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      post_search: [],
      query: "",
      searchStatus: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    document.title = "Paku - Rent";
  }

  componentWillReceiveProps(nextProps) {
    const post_search = nextProps.post.post_search;

    if (post_search != null) {
      if (post_search.length !== 0) {
        if (post_search.post !== "No have post") {
          this.setState({
            post_search: post_search,
            isLoading: false,
          });
        } else {
          this.setState({
            post_search: [],
            isLoading: false,
          });
        }
      }
    }
  }

  resultRenderer = ({ _id, title, location, date }) => {
    return (
      <Link
        to={{
          pathname: `/book/${_id}`,
        }}
      >
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header>{title}</Item.Header>
              <Item.Meta>{location.address}</Item.Meta>
              <Item.Description>
                เวลา {date.open} - {date.close}
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Link>
    );
  };

  onSearchChange = (e, { value }) => {
    this.setState({
      query: value,
      post_search: [],
    });
  };

  onSubmit = () => {
    let searchQuery = this.state.query;
    if (this.state.query.length > 2) {
      this.setState({
        isLoading: true,
      });
      this.props.searchPost(searchQuery);
      document.getElementById("searchBar").focus();
    }
  };

  displayResult = () => {
    if (this.state.query.length > 2) {
      this.setState({
        searchStatus: true,
      });
    }
  };

  hideResult = () => {
    this.setState({
      searchStatus: false,
    });
  };

  render() {
    return (
      <Grid centered>
        <Grid.Column mobile={13} tablet={8} computer={7} widescreen={5}>
          <Search
            id="searchBar"
            open={this.state.searchStatus}
            fluid
            input={{
              icon: {
                name: "search",
                circular: true,
                link: true,
                onClick: this.onSubmit,
              },
              fluid: true,
              placeholder: "ค้นหาที่จอดรถ...",
              ref: this.inputRef,
            }}
            loading={this.state.isLoading}
            onFocus={this.displayResult}
            onBlur={this.hideResult}
            onSearchChange={this.onSearchChange}
            results={this.state.post_search}
            resultRenderer={this.resultRenderer}
            noResultsMessage={<div>ไม่พบที่จอดรถ</div>}
          />
          {/* <Input className="my-3" icon placeholder="ค้นหาที่จอดรถ..." fluid>
            <input
              className="border-0 shadow"
              style={{ borderRadius: "12px" }}
              onChange={this.handleChange("query")}
            />
            <Icon name="search link" onClick={this.onSubmit} />
          </Input> */}
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  post: state.post,
});

export default connect(mapStateToProps, { searchPost })(withRouter(SearchBox));
