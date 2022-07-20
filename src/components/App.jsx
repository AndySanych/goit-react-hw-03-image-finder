import { Component } from 'react';

import { animateScroll as scroll } from 'react-scroll';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PixabayApi from '../api/PixabayApi';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';
import Button from './Button';

import styles from './App.module.css';

export default class App extends Component {
  static propTypes = {};

  state = {
    searchQuery: '',
    showModal: false,
    page: 1,
    images: [],
    error: null,
    status: 'idle',
    currImg: {},
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.setState({ status: 'pending', page: 1 });

      PixabayApi(searchQuery)
        .then(articles =>
          this.setState({
            images: articles,
            status: 'resolved',
          })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));

      scroll.scrollToBottom();
    }

    if (prevState.page !== page) {
      this.setState({ status: 'pending' });

      PixabayApi(searchQuery, page)
        .then(articles =>
          this.setState(prevState => ({
            images: [...prevState.images, ...articles],
            status: 'resolved',
          }))
        )
        .catch(error => {
          this.setState({ error, status: 'rejected' });
          toast.error(`${searchQuery} no found`);
        });

      scroll.scrollToBottom();
    }
  }

  toggleModal = image => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      currImg: image,
    }));
  };

  incrementPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleSearchbarFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  scrollToBottom = () => {
    scroll.scrollToBottom();
  };

  render() {
    const { images, error, status, currImg, searchQuery } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleSearchbarFormSubmit} />
        {status === 'idle' && <div>Free images</div>}

        {status === 'rejected' && <h1>{error.message}</h1>}

        {status === 'resolved' && (
          <>
            <ImageGallery images={images} onOpenModal={this.toggleModal} />
            {images.length !== 0 && <Button onLoadMore={this.incrementPage} />}
            {images.length === 0 && <div>{searchQuery} no found</div>}
          </>
        )}

        {status === 'pending' && (
          <>
            <ImageGallery images={images} onOpenModal={this.toggleModal} />
            <Loader />
          </>
        )}

        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={currImg.largeImageURL} alt={currImg.tags} />
          </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
