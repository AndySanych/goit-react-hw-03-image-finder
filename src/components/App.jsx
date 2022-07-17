import { Component } from 'react';
// import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';

export default class App extends Component {
  handleSearchbarSubmit = search => {
    console.log(search)
  }
 
  render() {
    return (
      <div className='App'>
        <Searchbar onSubmit={this.handleSearchbarSubmit}/>
      </div>
    );
  }
}
