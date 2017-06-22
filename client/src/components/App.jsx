import React from 'react';
import $ from 'jquery';
import SearchBar from './SearchBar.jsx';

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.submitSearch = this.submitSearch.bind(this);
  }

  submitSearch(searchQuery) {
    $.ajax({
      url: '/search',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ searchQuery: searchQuery}),
      success: (result) => {
        console.log(result);
        if (result) {
          window.location.href += result;
        }
      },
      error: (error) => {
        console.log("Error is: " + JSON.stringify(error));
      }
    })
  }



  render() {
    return (
      <div className="cover-container">
        <h1 className="cover-heading">HTML Archiver.</h1>
        <p className="lead">
          HTML Archiver.
        </p>
        <SearchBar submitSearch={ this.submitSearch } />
      </div>
    )
  }
};

export default App;

