import './css/styles.css';
import _debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

let countryName = '';

import { fetchCountries } from './fetchCountries';
fetchCountries();

refs = {
    searchQuery: document.getElementById("search-box"),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

function onInputChange(e) {
    if (refs.searchQuery = '') {
        markupClear();
        return;
    }
    e.preventDefault();
    countryName = e.target.value.trim();
   
}
refs.searchQuery.addEventListener('input', _debounce(onInputChange, DEBOUNCE_DELAY));

fetchCountries(countryName)
    .then(countries => {
        if (countries.length > 10) {
            markupClear();
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else if (countries.length >= 2 || countries.length <= 10) {
            markupClear();
            countryListMarkup();
        } else if (countries.length = 1) {
            markupClear();
        }
    })
    .catch(Notiflix.Notify.failure("Oops, there is no country with that name"));

function markupClear() {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
}

function countryListMarkup(countries) {
    const markup = countries
        .map(country => {
            return `<li>
        <span>${country.flags.svg}</span>
        <p>${country.name}</p>
        </li>`
    })
    .join('')
    refs.countryList.insertAdjacentHTML('beforeend', markup)
}