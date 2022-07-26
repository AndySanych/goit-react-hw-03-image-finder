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

class App extends Component {
  state = {
    dataImages: [],
    searchQuery: '',
    page: 1,
    status: 'idle',
    error: null,
    showModal: false,
    largeImageURL: '',
    tagImageAlt: '',
    loader: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.setState({ status: 'pending' });

      PixabayApi(searchQuery, page)
        .then(response =>
          this.setState({
            dataImages: response,
            page: 1,
            status: 'resolved',
          })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));

      scroll.scrollToBottom();
    }

    if (prevState.page !== page && page !== 1) {
      this.setState({ status: 'pending' });

      PixabayApi(searchQuery, page)
        .then(response =>
          this.setState(prevState => ({
            dataImages: [...prevState.dataImages, ...response],
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

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleOpenModal = image => {
    const { largeImageURL, tags } = image;
    this.setState({
      showModal: true,
      largeImageURL: largeImageURL,
      tagImageAlt: tags,
    });
  };

  handleCloseModal = e => {
    this.setState({
      showModal: false,
      largeImageURL: '',
      tagImageAlt: '',
    });
  };

  scrollToBottom = () => {
    scroll.scrollToBottom();
  };

  render() {
    const {
      dataImages,
      showModal,
      largeImageURL,
      tagImageAlt,
      status,
      error,
      searchQuery,
    } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onFormSubmit={this.handleFormSubmit} />

        {status === 'idle' && <div>Free images</div>}

        {status === 'rejected' && <h1>{error.message}</h1>}

        {status === 'resolved' && (
          <>
            <ImageGallery
              dataImages={dataImages}
              onOpenModal={this.handleOpenModal}
            />

            {dataImages.length === 0 && <div>{searchQuery} no found</div>}

            {dataImages.length >= 11 && (
              <Button onLoadMore={this.handleLoadMore} />
            )}
          </>
        )}

        {status === 'pending' && (
          <>
            <ImageGallery
              dataImages={dataImages}
              onOpenModal={this.handleOpenModal}
            />
            {this.state.loader && <Loader />}
          </>
        )}

        {showModal && (
          <Modal onCloseModal={this.handleCloseModal}>
            <img src={largeImageURL} alt={tagImageAlt} />
          </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
