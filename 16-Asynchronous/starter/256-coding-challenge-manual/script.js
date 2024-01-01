// FUNCTIONS

const getJSON = function (url, errorMsg) {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const renderCountry = function (data, className = '') {
  const html = `
        <div class="col-lg-4 mb-5 ${className}">
          <article class="country">
            <img class="w-100 mb-4" src="${data.flags.svg}" />
            <div class="w-100 p-4">
              <h3 class="fw-bold">${data.name.common}</h3>
              <h6 class="text-uppercase fw-bold text-secondary mb-4">
                ${data.region}
              </h6>
              <p>
                <span class="me-2">👫</span>${(
                  +data.population / 1_00_00_000
                ).toFixed(1)} crore people
              </p>
              <p>
                <span class="me-2">🗣️</span>${Object.values(data.languages)[0]}
              </p>
              <p>
                <span class="me-2">💰</span
                >${Object.values(data.currencies)[0].name}
              </p>
            </div>
          </article>
        </div>
        `;
  document.querySelector('.content').insertAdjacentHTML('beforeEnd', html);
};

// EVENT LISTENERS
document
  .querySelector('.btn-where-am-i')
  .addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('.btn-where-am-i').disabled = true;
    setTimeout(() => {
      document.querySelector('.btn-where-am-i').disabled = false;
    }, 2000);
    document.querySelector('.content').style.opacity = 0;
    document.querySelector('.content').innerHTML = '';
    document.querySelector('.error').style.opacity = 0;
    document.querySelector('.error').innerHTML = '';
    const lat = Number(document.querySelector('#lat').value);
    const lng = Number(document.querySelector('#lng').value);
    setTimeout(() => {
      whereAmI(lat, lng);
    }, 1000);
  });

// WHERE AM I FUNCTION
const whereAmI = function (lat, lng) {
  // getPosition()
  //   .then(pos => {
  //     const { latitude: lat, longitude: lng } = pos.coords;
  //     console.log(lat, lng);
  //     return getJSON(
  //       `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`,
  //       `Location not found.`
  //     );
  //   })
  // getJSON(
  //   `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`,
  //   `Location not found.`
  // )

  getJSON(
    `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`,
    `Location not found.`
  )
    .then(data => {
      if (!data.address)
        throw new Error(
          `Wrong input of Latitude or Longitude. ${lat}, ${lng} does not exist.`
        );
      return getJSON(
        `https://restcountries.com/v3.1/name/${data.address.country}?fullText=true`,
        `Country was not found.`
      );
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbourCountry = data[0].borders?.[0];
      if (!neighbourCountry)
        throw new Error(
          `Neighbour Country not found for ${data[0].name.common}`
        );
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbourCountry}`,
        `Neighbour Country not found.`
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      document
        .querySelector('.error')
        .insertAdjacentHTML(
          'beforeEnd',
          `<div class="col text-center text-secondary"><h4>${err.message}</h4></div>`
        );
    })
    .finally(() => {
      document.querySelector('.error').style.opacity = 1;
      document.querySelector('.content').style.opacity = 1;
    });
};
