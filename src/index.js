import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';

const searchEl = document.getElementById('search-box');

const DEBOUNCE_DELAY = 300;

searchEl.addEventListener(
  'input',
  debounce(name => {
    name = searchEl.value;
    fetchCountries(name);
  }, DEBOUNCE_DELAY)
);
