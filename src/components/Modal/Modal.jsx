import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import styles from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if(event.code === 'Escape') {
      this.props.onCloseModal();
    } 
  };

  handleOverlayClick = event => {
    if(event.currentTarget === event.target) {
      this.props.onCloseModal();
    } 
  };

  render() {
    return (
      <div className={styles.Overlay} onClick={this.handleOverlayClick}>
        <div className={styles.Modal}>
        {this.props.children}
          </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

export default Modal