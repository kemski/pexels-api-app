const auth = "563492ad6f91700001000001cd89e7b693dd48ad8b62914d2febd2b6";
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input')
const form = document.querySelector('.search-form');
let searchValue;
const more = document.querySelector('.more');
let page = 1;
let fetchLink;
let currentSearch;

//Evetnt listenrr

searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {

    e.preventDefault();
    searchPhotos(searchValue);

})
more.addEventListener('click', loadMore);

function updateInput(e) {
    searchValue = e.target.value;
    currentSearch = searchValue;

}

async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    })
    const data = await dataFetch.json();
    return data;
}

function generatePictures(data) {
    const foto = data.photos;
    foto.forEach(photo => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML =
            `<div class="gallery-info">
            <a href="${photo.photographer_url}" target="_blank"><p>${photo.photographer}</p></a>
            <a href="${photo.src.original}" target="_blank">Download</a>
        </div>
        <img src="${photo.src.large}">`;
        gallery.appendChild(galleryImg);
    });

}
async function curatedPhotos() {
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15";
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

async function searchPhotos(query) {
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
    const data = await fetchApi(fetchLink);
    generatePictures(data);


}

function clear() {
    gallery.innerHTML = "";
    searchInput.value = "";
}

async function loadMore() {
    page++;
    if (currentSearch) {
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
    } else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

curatedPhotos();