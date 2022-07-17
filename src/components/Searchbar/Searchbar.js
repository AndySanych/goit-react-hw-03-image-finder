import { Component } from 'react';
import { ImSearch } from 'react-icons/im';

export default class Searchbar extends Component {
  state = {
    search: '',
  };

  handleSearchChange = event => {
    this.setState({search: event.currentTarget.value.toLowerCase()})
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state.search);
    this.setState({search: ''})
  }

  render() {
    return (
      <header className='Searchbar'>
        <form onSubmit={this.handleSubmit} className='SearchForm'>
          <button type="submit" className='SearchForm-button'>
          <ImSearch />
            {/* <span class="SearchForm-button-label">Search</span> */}
          </button>

          <input
            className='SearchForm-input'
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.search}
            onChange={this.handleSearchChange}
          />
        </form>
      </header>
    );
  }
}
