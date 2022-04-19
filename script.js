"use strict";

const countryContainer = document.querySelector(".country__container");
let country;
let city;
let latt;
let longt;

const flagSourceHandler = (src) => {
  document.querySelector(".country__flag").src = src;
};

const renderCountry = async function (country, latt, longt, city) {
  countryContainer.insertAdjacentHTML(
    "beforeend",
    `
    <div class="country">
      <img
        class="country__flag"
        src=""
        alt="Country flag"
      />
      <h2 class="country__name">${country}</h2>
      <p class="coords">Latitude: ${latt}<br />Longitude: ${longt}</p>
      <p class="city__name">${city} City</p>
    </div>
  `
  );

  const res = await fetch(
    `https://restcountries.com/v3.1/name/${country.toLowerCase()}`
  );
  const data = await res.json();
  flagSourceHandler(data[0].flags.svg);

  countryContainer.style.opacity = 1;

  // .catch((err) => console.error(`${err.message}. Please try again!`));
};

// navigator.geolocation.getCurrentPosition(
//   function (position) {
//     const { latitude } = position.coords;
//     const { longitude } = position.coords;
//     whereAmI(latitude, longitude);
//   },
//   function () {
//     alert("Could not get your position");
//   }
// );

// Promisfying geolocation
const getPositon = new Promise(function (resolve, reject) {
  navigator.geolocation.getCurrentPosition(resolve, reject);
});

// Consuming promises with then method
/*
const whereAmI = function () {
  getPositon
    .then((pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then((res) => res.json())
    .then((data) => {
      country = data.country;
      city = data.city;
      latt = data.latt;
      longt = data.longt;
      renderCountry(country, latt, longt, city);
    })
    .catch((err) => console.error(`${err.message}. Please try again!`));
};
*/

// Consuming promises with async/await
const whereAmI = async function () {
  const pos = await getPositon;
  const { latitude: lat, longitude: lng } = pos.coords;
  const res = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  const countryData = await res.json();

  renderCountry(
    countryData.country,
    countryData.latt,
    countryData.longt,
    countryData.city
  );

  // .catch((err) => console.error(`${err.message}. Please try again!`));
};

whereAmI();
