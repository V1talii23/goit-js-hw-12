import axios from 'axios';

const API_KEY = '52329840-3cdbe1d1ca17a86ceb553d9b5';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {};
axios.defaults.params['key'] = API_KEY;

async function getImagesByQuery(query, page = 1) {
  const response = await axios.get('', {
    params: {
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 15,
      page,
    },
  });

  return response.data;
}

export default getImagesByQuery;
