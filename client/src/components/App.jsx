import React from 'react';
import $ from 'jquery';
import SearchBar from './SearchBar.jsx';

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    }

    this.submitSearch = this.submitSearch.bind(this);
  }

  submitSearch(searchQuery) {
    $.ajax({
      url: '/search',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ searchQuery: searchQuery}),
      success: (result) => {
        console.log(result, "RESULT");
        if (result.type === 'filepath') {
          window.location.href += result.response;
        } else {
          this.setState({ message: result.response });
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
         { this.state.message &&
          <div>
            { this.state.message }
          </div>
        }
      </div>
    )
  }
};

export default App;

