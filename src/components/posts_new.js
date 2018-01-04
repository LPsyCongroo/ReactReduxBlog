import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    const { meta: {touched, error}, label, input } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`

    return (
      <div className={className}>
        <label>{label}</label>
        <input
          className="form-control"
          type="text"
          {...input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  // this-keyword needs to be binded to refer to the component  
  onSubmit(values) {
    // call the action creator and pass in the validated form values
    this.props.createPost(values, () => {
      // Props to help with navigation that come from react-router Route component
      this.props.history.push("/");
    });
  }

  render(){
    // handleSubmit is a redux-form property that deals with the clientside error handling
    // it takes a callback (onSubmit) that performs our backend functions.
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button className="btn btn-primary" type="submit">Save</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

// Called when form is submitted
function validate(values) {
  // console.log(values) -> {title:'ads', categories: 'sdfsdf', content: 'ssdfsdf'}
  const errors = {};

  // validate inputs from 'values'
  if(!values.title || values.title.length < 3)
    errors.title = "Enter a title that is at least 3 characters";
  if(!values.categories)
    errors.categories = "Y u no add categories?!";
  if(!values.content)
    errors.content = "Enter some content foo!";
  // if errors is empty, form is fine to sunbmit
  // if any properties, redux-forms assumes invalid
  return errors;
}

export default reduxForm({
  form: 'PostsNewForm',
  validate
})(
  connect(null, {createPost })(PostsNew)
);