import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;

import { fetchCountries } from './fetchCountries';
fetchCountries();

const refs = {
    searchQuery: document.getElementById("search-box"),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

let countryName = '';
function onInputChange(e) {
    if (refs.searchQuery = '') {
        markupClear();
        return;
    }
    e.preventDefault();
    countryName = e.target.value.trim();
   
}
refs.searchQuery.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

fetchCountries(countryName)
    .then(countries => {
        if (countries.length = 1) {
            markupClear();
            countryInfoMarkup(countries);
        }
        else if (countries.length >= 2 || countries.length <= 10) {
            markupClear();
            countryListMarkup(countries);
        } else if (countries.length > 10) {
            markupClear();
            Notify.info('Too many matches found. Please enter a more specific name.');
        }
    })
    .catch(Notify.failure("Oops, there is no country with that name"));

function markupClear() {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
}

function countryListMarkup(countries) {
    const markup = countries
        .map(country => {
            return `<li class="country-item">
            <img src="${country.flags}" alt = "flag of a country" class="country-image"/>
            <p class = "country-name">${country.name}</p>
            </li>`
    })
    .join('')
    refs.countryList.insertAdjacentHTML('beforeend', markup);
}

function countryInfoMarkup(countries) {
    const langARrr = countries.map(({ languages }) => Object.values(languages).join(', '));
    const markup = countries
        .map(country => {
            return `<li>
            <p class="add-info">Capital: <span class="value">${country.capital}</span></p>
            <p class="add-info">Population: <span class="value">${country.population}</span></p>
            <p class="add-info">languages: <span class="value">${langARrr}</span></p>
           </li>`
        })
    .join('')
    refs.countryInfo.insertAdjacentHTML('beforeend', markup);
}
