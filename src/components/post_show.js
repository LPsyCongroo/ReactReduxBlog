import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';

class PostShow extends Component {
  componentDidMount() {
    // Get the id from the URL using react-router props
    // params lists all the wildcard tokens in the url
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  render() {
    const { post } = this.props;

    // catch for initial load
    if(!post)
      return <div>Loading...</div>

    return (
      <div>
        <h1>{post.title}</h1>
        <h5>Categories: {post.categories}</h5>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, {fetchPost})(PostShow);