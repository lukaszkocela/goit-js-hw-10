import Notiflix from 'notiflix';

const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
const API_URL = 'https://restcountries.com/v3.1/name/';
const countryDetails = '?fields=name,capital,population,flags,languages';

export const fetchCountries = name => {
  name = name.trim();
  fetch(API_URL + name + countryDetails)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(country => {
      if (country.length > 10) {
        tooManyCountries(country);
      } else if (country.length >= 2 && country.length <= 10) {
        severalCountries(country);
      } else if ((country.length = 1)) {
        singleCountry(country);
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      clearCountries();
    });
  name.currentTarget.reset();
};

const tooManyCountries = country => {
  clearCountries();
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
};

const severalCountries = country => {
  clearCountries();

  const countries = country
    .map(country => {
      return `<li><img src="${country.flags.svg}" alt="${
        country.flags.alt
      }" width="30" height="auto"><p style="font-style: italic; border-bottom: #212121 solid 1px"> 
      ${country.name.official.toUpperCase()}</p></li>`;
    })
    .join(' ');

  countryListEl.innerHTML = countries;
};

const singleCountry = data => {
  clearCountries();

  const countries = data
    .map(country => {
      return `
       <h2 style="font-size: 45px; border: 3px solid #212121; text-align: center; max-width: 700px; background-color: #d3d3d3">
       <img src="${country.flags.svg}" alt="${
        country.flags.alt
      } width="40" height="40"> ${country.name.official}</h2>
        <p><span style="font-weight: bold; font-style: italic">Capital:</span> ${
          country.capital
        }</p>
        <p><span style="font-weight: bold; font-style: italic">Population:</span>
        ${country.population.toLocaleString()}</p>
        <p><span style="font-weight: bold; font-style: italic">Languages:</span> ${Object.values(
          country.languages
        ).join(', ')}</p>`;
    })
    .join(' ');

  countryInfoEl.innerHTML = countries;
};

const clearCountries = () => {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
};
