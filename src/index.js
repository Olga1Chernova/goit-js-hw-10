import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;

import { fetchCountries } from './fetchCountries';


const refs = {
    searchQuery: document.querySelector("#search-box"),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

let countryName = '';
function onInputChange(e) {
    e.preventDefault();
    countryName = e.target.value.trim();
    if (countryName === '') {
        markupClear();
        return;
    }
    fetchCountries(countryName)
      .then(countries => {
          if (countries.length === 1) {
              markupClear();
              countryInfoMarkup(countries);
          }
          else if (countries.length >= 2 && countries.length <= 10) {
              markupClear();
              countryListMarkup(countries);
          } else if (countries.length > 10) {
              markupClear();
              Notify.info('Too many matches found. Please enter a more specific name.');
          }
      }).catch(() => Notify.failure("Oops, there is no country with that name"));
}
refs.searchQuery.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function markupClear() {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
}

function countryListMarkup(countries) {
    const markup = countries
        .map(country => {
            return `<li class="country-item">
            <img src="${country.flags.svg}" alt = "flag of a country" class="country-image"/>
            <p class = "country-name">${country.name.official}</p>
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
            <img src="${country.flags.svg}" alt = "flag of a country" class="country-image"/>
            <p class = "country-name">${country.name.official}</p>
            <p class="add-info">Capital: <span class="value">${country.capital}</span></p>
            <p class="add-info">Population: <span class="value">${country.population}</span></p>
            <p class="add-info">languages: <span class="value">${langARrr}</span></p>
           </li>`
        })
    .join('')
    refs.countryInfo.insertAdjacentHTML('beforeend', markup);
}
