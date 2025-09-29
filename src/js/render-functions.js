import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';

const ul = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.search-more-btn');

const gallery = new SimpleLightbox('.gallery-item a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function createGallery(images) {
  const markup = images
    .map(
      ({
        tags,
        likes = 0,
        views = 0,
        comments = 0,
        downloads = 0,
        webformatURL,
        largeImageURL,
      }) => {
        return `
        <li class="gallery-item">
          <a class="gallery-origin-img" href="${largeImageURL}">
            <img class="gallery-prewiew-img" src="${webformatURL}" alt="${tags}" width="360" height="152"/>
            </a>
            <div class="gallery-info-wrapper">
              <h4 class="gallery-info-item">Likes<span>${likes}<span></h4>
              <h4 class="gallery-info-item">Views<span>${views}<span></h4>
              <h4 class="gallery-info-item">Comments<span>${comments}<span></h4>
              <h4 class="gallery-info-item">Downloads<span>${downloads}<span></h4>
            </div>
        </li>
        `;
      }
    )
    .join('');

  ul.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
}

function clearGallery() {
  ul.innerHTML = '';
}

function showLoader() {
  loader.classList.remove('hide');
}

function hideLoader() {
  if (!loader.classList.contains('hide')) {
    loader.classList.add('hide');
  }
}

function showLoaderMoreButton() {
  loadMoreBtn.classList.remove('hide');
}

function hideLoaderMoreButton() {
  if (!loadMoreBtn.classList.contains('hide')) {
    loadMoreBtn.classList.add('hide');
  }
}

function checkIfReachedTheEnd(res, page, perPage) {
  const alreadyLoaded = page * perPage;

  if (alreadyLoaded >= res.totalHits) {
    hideLoaderMoreButton();
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      icon: '',
      position: 'topRight',
      timeout: 5000,
      progressBar: false,
      close: false,
      messageColor: 'white',
    });
    return true;
  }
}

export {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoaderMoreButton,
  hideLoaderMoreButton,
  loadMoreBtn,
  checkIfReachedTheEnd,
};
