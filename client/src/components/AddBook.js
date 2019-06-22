import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries";

class AddBook extends Component {
  state = {
    name: "",
    genre: "",
    author_id: ""
  };

  displayAuthors = () => {
    const data = this.props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading authors...</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  submitHandler = e => {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        author_id: this.state.author_id
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  };
  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <div className="field">
          <label>Book name:</label>
          <input
            onChange={this.changeHandler}
            type="text"
            name="name"
            value={this.state.name}
          />
        </div>

        <div className="field">
          <label>Genre</label>
          <input
            onChange={this.changeHandler}
            type="text"
            name="genre"
            value={this.state.genre}
          />
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={this.changeHandler} name="author_id">
            {this.displayAuthors()}
          </select>
        </div>
        <div className="field">
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
