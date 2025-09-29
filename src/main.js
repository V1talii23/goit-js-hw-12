import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import getImagesByQuery from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoaderMoreButton,
  hideLoaderMoreButton,
  loadMoreBtn,
} from './js/render-functions';

let page = 1;

let query = '';

const form = document.querySelector('.form');
form.addEventListener('submit', formSubmit);

async function formSubmit(e) {
  e.preventDefault();
  clearGallery();
  hideLoaderMoreButton();

  page = 1;

  query = String(e.target.elements['search-text'].value.toLowerCase().trim());

  if (!query) {
    hideLoaderMoreButton();

    return iziToast.error({
      icon: '',
      position: 'topRight',
      message: 'Please, enter your search query!',
      timeout: 5000,
      progressBar: false,
      close: false,
      messageColor: 'white',
    });
  }

  showLoader();
  try {
    const res = await getImagesByQuery(query, page);

    if (!res.hits.length) {
      clearGallery();
      hideLoaderMoreButton();

      return iziToast.info({
        icon: '',
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        timeout: 5000,
        progressBar: false,
        close: false,
        messageColor: 'white',
      });
    }

    createGallery(res.hits);
    if (res.hits.length * page > res.totalHits) {
      hideLoaderMoreButton();
      return iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        icon: '',
        position: 'topRight',
        timeout: 5000,
        progressBar: false,
        close: false,
        messageColor: 'white',
      });
    }

    showLoaderMoreButton();

    e.target.reset();
  } catch (error) {
    page = 1;
    console.error(error.message);

    clearGallery();
    hideLoaderMoreButton();

    return iziToast.error({
      icon: '',
      position: 'topRight',
      message: 'Something went wrong. Please try again later.',
      timeout: 5000,
      progressBar: false,
      close: false,
      messageColor: 'white',
    });
  } finally {
    hideLoader();
  }
}

loadMoreBtn.addEventListener('click', handlerLoadMore);

async function handlerLoadMore(e) {
  hideLoaderMoreButton();

  page += 1;

  showLoader();
  try {
    const res = await getImagesByQuery(query, page);

    createGallery(res.hits);
    const card = document.querySelector('.gallery-item');

    if (card) {
      window.scrollBy({
        top: 2 * card.getBoundingClientRect().height,
        behavior: 'smooth',
      });
    }

    if (res.hits.length * page > res.totalHits) {
      hideLoaderMoreButton();
      return iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        icon: '',
        position: 'topRight',
        timeout: 5000,
        progressBar: false,
        close: false,
        messageColor: 'white',
      });
    }

    showLoaderMoreButton();
  } catch (error) {
    page = 1;
    console.error(error.message);

    clearGallery();
    hideLoaderMoreButton();

    return iziToast.error({
      icon: '',
      position: 'topRight',
      message: 'Something went wrong. Please try again later.',
      timeout: 5000,
      progressBar: false,
      close: false,
      messageColor: 'white',
    });
  } finally {
    hideLoader();
  }
}
