const breedsContainer = document.getElementById('breeds-container');
const paginationContainer = document.getElementById('pagination');
const searchInput = document.getElementById('searchInput');
const itemsPerPage = 10;
let currentPage = 1;
let breeds = [];

async function fetchBreeds() {
  try {
    const response = await fetch(`https://dog.ceo/api/breeds/list/all`);
    const data = await response.json();
    breeds = Object.keys(data.message);
    renderBreeds();
  } catch (error) {
    console.error('Error fetching breeds:', error);
  }
}

function renderBreeds() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBreeds = breeds.slice(startIndex, endIndex);

  breedsContainer.innerHTML = '';
  currentBreeds.forEach(breed => {
    fetchBreedImage(breed);
  });

  renderPagination();
}

async function fetchBreedImage(breed) {
  try {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    const data = await response.json();
    const breedCard = createBreedCard(breed, data.message);
    breedsContainer.appendChild(breedCard);
  } catch (error) {
    console.error('Error fetching breed image:', error);
  }
}

function createBreedCard(breed, imageUrl) {
  const breedCard = document.createElement('div');
  breedCard.className = 'breed-card';

  const image = document.createElement('img');
  image.src = imageUrl;
  breedCard.appendChild(image);

  const breedName = document.createElement('h3');
  breedName.textContent = breed;
  breedCard.appendChild(breedName);

  return breedCard;
}

function renderPagination() {
  const totalPages = Math.ceil(breeds.length / itemsPerPage);

  paginationContainer.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.addEventListener('click', () => {
      currentPage = i;
      renderBreeds();
    });
    paginationContainer.appendChild(pageButton);
  }
}

function filterBreeds() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredBreeds = breeds.filter(breed => breed.toLowerCase().includes(searchTerm));
  breeds = filteredBreeds;
  currentPage = 1;
  renderBreeds();
}

fetchBreeds();






// const breedsListContainer = document.getElementById('breeds-list');
// const paginationContainer = document.getElementById('pagination');

// let currentPage = 1;
// const breedsPerPage = 10;

// async function fetchData(page) {
//   try {
//     const response = await fetch(`https://dog.ceo/api/breeds/list/all`);
//     const data = await response.json();
//     const breeds = Object.keys(data.message);

//     const start = (page - 1) * breedsPerPage;
//     const end = start + breedsPerPage;
//     const paginatedBreeds = breeds.slice(start, end);

//     displayBreeds(paginatedBreeds);
//     displayPagination(breeds.length);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }

// function displayBreeds(breeds) {
//   breedsListContainer.innerHTML = '';

//   breeds.forEach(breed => {
//     const breedCard = document.createElement('div');
//     breedCard.classList.add('breed-card');

//     // const breedImage = document.createElement('img');
//     // breedImage.classList.add('breed-image');
//     // breedImage.src = `https://dog.ceo/api/breed/${breed}/image/random`;
//     breedImage.alt = breed;

//     const breedName = document.createElement('div');
//     breedName.classList.add('breed-name');
//     breedName.textContent = breed;

//     breedCard.appendChild(breedImage);
//     breedCard.appendChild(breedName);

//     breedsListContainer.appendChild(breedCard);
//   });
// }

// function displayPagination(totalBreeds) {
//   paginationContainer.innerHTML = '';

//   const totalPages = Math.ceil(totalBreeds / breedsPerPage);

//   for (let i = 1; i <= totalPages; i++) {
//     const btn = document.createElement('button');
//     btn.classList.add('pagination-btn');
//     btn.textContent = i;
//     btn.addEventListener('click', () => handlePaginationClick(i));

//     paginationContainer.appendChild(btn);
//   }
// }

// function handlePaginationClick(page) {
//   currentPage = page;
//   fetchData(currentPage);
// }

// // Initial data fetch on page load
// fetchData(currentPage);
