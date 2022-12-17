import './css/styles.css';
import _debounce from 'lodash.debounce'

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
        refs.countryInfo.innerHTML = '';
        refs.countryList.innerHTML = '';
        return;
    }
    e.preventDefault();
    countryName = e.target.value.trim();
   
}
refs.searchQuery.addEventListener('input', _debounce((onInputChange, DEBOUNCE_DELAY)));