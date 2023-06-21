import './css/styles.css';
import { fetchBreeds } from './js/cat-api';
import { fetchCatByBreed } from './js/cat-api';
import Notiflix from 'notiflix';


const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loaderText = document.querySelector('.loader');



loaderText.classList.add("invisible");


function fillList() {
  loaderText.classList.remove("invisible");

  fetchBreeds()
    .then((data) => {
      const breedList = data.map((item) => ({ name: item.name, id: item.id }));
      breedSelect.insertAdjacentHTML('afterbegin', breedList.map(({ id, name }) =>
        `<option value = "${id}">${name}</option>`)
        .join(''));
    })
    .catch(() =>
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')
  );
  
  loaderText.classList.add("invisible");
};

fillList();

breedSelect.addEventListener('change', () => {
  
  loaderText.classList.remove("invisible");

  clearCatCard();
    const value = breedSelect.options[breedSelect.selectedIndex].value;
        
  fetchCatByBreed(value)
    .then(catData => {
      loaderText.classList.add("invisible");
      createCatCard(catData); 
  })
    .catch(() => {
      loaderText.classList.add("invisible");
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')
    })
    
});

function createCatCard(cats) {
  
  const cat = cats[0];
  console.log(cat);

  const markup = `
    <div>
    <img src="${cat.url}" class = "cat-img" alt="cat" width="600">
    </div>
    <div>
    <h2>${cat.breeds[0].name}</h2>
    <p> ${cat.breeds[0].description}</p>
    <h3>Temperamnet</h3>
    <p class ="cat-temp"> ${cat.breeds[0].temperament}</p>
    </div>
    `;
    catInfo.insertAdjacentHTML('afterbegin', markup);
  };



function clearCatCard() {
  catInfo.innerHTML = '';
};