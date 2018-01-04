import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostShow extends Component {
  componentDidMount() {
    // If a user navigates from the homepage, they can just use the list of posts
    // However a direct link to a post is used, then a get request is sent.
    if(!this.props.post){
      // Get the id from the URL using react-router props
      // params lists all the wildcard tokens in the url
      const { id } = this.props.match.params;
      this.props.fetchPost(id);
    }
  }

  onDeleteClick() {
    const { id } = this.props.match.params;    
    // call delete action creator
    // don't pass id as this.props.post.id because it assumes we've fetched it. We may not have!
    this.props.deletePost(id, () => {
      this.props.history.push("/");
    });
  }

  render() {
    const { post } = this.props;

    // catch for initial load
    if(!post)
      return <div>Loading...</div>

    return (
      <div>
        <Link to="/" className="btn btn-warning">Back</Link>
        <button 
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >Delete</button>
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

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);