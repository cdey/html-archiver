import React from 'react';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: ''
    }

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    handleSearchChange(e) {
      this.setState({ searchQuery: e.target.value });
    }

    handleSubmit(e) {
      e.preventDefault();
      this.props.submitSearch(this.state.searchQuery);
      this.setState({ searchQuery: '' });
    }

    render() {
      return (
        <div className="row">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for url or job id..."
              onChange= { (e) => { this.handleSearchChange(e) } }
              value={ this.state.searchQuery } >
            </input>
            <span className="input-group-btn">
              <button
                className="btn btn-default"
                name="submit"
                type="button"
                onClick={ this.handleSubmit } >
              Go!
              </button>
            </span>
          </div>
        </div>
      )
    }
}

export default SearchBar;