import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchPosts } from '../actions';

class PostIndex extends Component {
  componentDidMount() {
    // data fetched is async hence willmount or didmount wont make a difference
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          {post.title}
        </li>
      )
    });
  }
  
  render () {
    return (
      <div>
        <h1>Posts</h1>
        <ul className="list-group">
          {this.renderPosts()};
        </ul>
      </div>
    )
  }
}

// Map redux state to Component level
function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostIndex);