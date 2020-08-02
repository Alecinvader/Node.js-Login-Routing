import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Book = props => (
  <tr>
    <td>{props.book.title}</td>
    <td>{props.book.author}</td>
    <td>{props.book.genre}</td>
    <td>
      <Link to = {"/edit/" + props.book._id}>edit</Link> | <a href = "#" onClick={() => {props.deleteBook(props.book._id)}}>delete</a>
    </td>
  </tr>
)

export default class LibraryView extends Component {
  constructor(props) {
    super(props);

    this.deleteBook = this.deleteBook.bind(this);

    this.state = {
      books: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/api/books')
      .then(response => {
        this.setState({
          books: response.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteBook(id) {
    axios.delete('http://localhost:4000/api/books/' + id)
    .then(response => console.log(response.data));

    this.setState({
      books: this.state.books.filter(element => element._id !== id)
    })
  }

  booksList() {
    return this.state.books.map(currentbook => {
      return <Book book = {currentbook} deleteBook = {this.deleteBook} key={currentbook._id}/>;
    })
  }


  render() {
    return (
      <div>
        <h3>Library View</h3>
        <table className ="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Read</th>
            </tr>
          </thead>
          <tbody>
            {this.booksList()}
          </tbody>
        </table>
      </div>
    )
  }
}