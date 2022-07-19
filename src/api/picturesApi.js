import axios from 'axios';
import PropTypes from 'prop-types';

const API_KEY = '28684196-5e4ec5b0bbf0e60d0e2c386d0';
const BASE_URL = 'https://pixabay.com/api/';

export default async function fetchImages(searchQuery, page) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    orientation: 'horizontal',
    image_type: 'photo',
    q: searchQuery,
    page: page,
    per_page: 12,
  });

  return await axios.get(`${BASE_URL}?${searchParams}`).then(response => {
    return response.data.hits;
  });
}

fetchImages.propTypes = {
  searchQuery: PropTypes.string,
  page: PropTypes.number,
};