'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className = ``) {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1_00_00_000
      ).toFixed(1)} crore people</p>
      <p class="country__row"><span>🗣️</span>${
        Object.values(data.languages)[0]
      }</p>
      <p class="country__row"><span>💰</span>${
        Object.values(data.currencies)[0].name
      }</p>
    </div>
  </article>`;
  // console.log(html);
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    renderCountry(data);
    // if (!data.borders) return;
    const neighbour = data.borders?.[0];
    // console.log(neighbour);
    if (!neighbour) return;
    console.log(neighbour);
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener('load', function () {
      // console.log(this.responseText);
      const [data] = JSON.parse(this.responseText);
      renderCountry(data, 'neighbour');
    });
  });
};

// getCountryData(`india`);
getCountryData(`usa`);
// getCountryData(`japan`);
// getCountryData(`russia`);
// getCountryData(`china`);
// getCountryData(`korea`);
*/

/*
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 second passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
        setTimeout(() => {
          console.log('5 second passed');
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/

// const request = fetch('https://restcountries.com/v3.1/name/india');
// console.log(request);

/*
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      return response.json();
    })
    .then(function ([data]) {
      console.log(data);
      renderCountry(data);
    });
};
*/

const renderError = function (msg) {
  countriesContainer.insertAdjacentHTML('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg) {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(
//       response => {
//         if (!response.ok)
//           throw new Error(`Country not found (${response.status})`);
//         return response.json();
//       }
//       // err => alert(err)
//     )
//     .then(function (data) {
//       renderCountry(data[0]);
//       const neighbourCountry = data[0].borders?.[0];
//       // const neighbourCountry = `hgjhg`;
//       if (!neighbourCountry) return;
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbourCountry}`);
//       // return 23;
//     })
//     .then(
//       response => {
//         if (!response.ok)
//           throw new Error(`Country not found (${response.status})`);
//         return response.json();
//       }
//       // err => alert(err)
//     )
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.error(`${err}, 💥💥💥 By Catch func`);
//       renderError(
//         `<h2>Something went wrong. ${err.message}</h2>
//         <br />`
//       );
//     })
//     .finally(() => (countriesContainer.style.opacity = 1));
//   // .then(data => alert(data));
// };

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, `Country not found`)
    .then(function (data) {
      renderCountry(data[0]);
      const neighbourCountry = data[0].borders?.[0];
      // const neighbourCountry = `dhdgdg`;
      if (!neighbourCountry)
        throw new Error(
          `Neighbour Country not found for ${country[0].toUpperCase()}${country.slice(
            1
          )}`
        );
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbourCountry}`,
        `Neighbour Country not found`
      );
      // return 23;
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err}, 💥💥💥 By Catch func`);
      renderError(
        `<h2>Something went wrong. ${err.message}</h2>
        <br />`
      );
    })
    .finally(() => (countriesContainer.style.opacity = 1));
  // .then(data => alert(data));
};

btn.addEventListener('click', function () {
  getCountryData('bharat');
});

// console.log('test start');
// setTimeout(() => {
//   console.log('0 seconds have passed timer finished');
// }, 0);
// Promise.resolve('resolved promise 1').then(res => console.log(res));
// Promise.resolve('resolved promise 2').then(res => {
//   for (let index = 0; index < 99999999; index++) {}
//   console.log(res);
// });
// console.log('test end');

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw in progress... 🔮');
//   if (Math.random() >= 0.5) {
//     resolve('You have won... 💰');
//   } else {
//     reject(new Error('You have lost... 💩'));
//   }
//   // setTimeout(() => {
//   //   if (Math.random() >= 0.5) {
//   //     resolve('You have won... 💰');
//   //   } else {
//   //     reject(new Error('You have lost... 💩'));
//   //   }
//   // }, 0); //2000
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const wait = seconds =>
//   new Promise(resolve => setTimeout(resolve, 1000 * seconds));

// wait(1)
//   .then(() => {
//     console.log('1 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('2 seconds passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3 seconds passed');
//     return wait(1);
//   })
//   .then(() => console.log('4 seconds passed'));

// Promise.resolve('This promise was resolved immediately').then(resp =>
//   console.log(resp)
// );
// Promise.reject(new Error('This promise was rejected immediately')).catch(err =>
//   console.error(err)
// );

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPosition().then(
//   pos => console.log(pos),
//   err => console.error(err.message)
// );

const imgContainer = document.querySelector('.images');
let currentImage;

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('💥 Problem loading image'));
    });
  });
};
/*
createImage('img/img-1.jpg')
  .then(img => {
    currentImage = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImage = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => (currentImage.style.display = 'none'))
  .catch(err => console.error(err));
*/
const getGeo = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
// fetch(`https://restcountries.com/v3.1/name/${country}`).then(res =>
//   console.log(res)
// );
const whereAmI = async function () {
  try {
    // getting pos from geolocation api
    const pos = await getGeo();
    const { latitude: lat, longitude: lng } = pos.coords;
    // console.log(lat, lng, `💥Using Geolocation API`);

    // getting country from geocode
    const resGeo = await fetch(
      `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`
    );
    const dataGeo = await resGeo.json();
    if (!dataGeo?.address)
      throw new Error(`💥Geocode was not found for that location`);

    // getting country data from restcountries
    const resCountry = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.address.country}?fullText=true`
    );
    if (!resCountry.ok)
      throw new Error(`💥Country was not found for that location`);
    const dataCountry = await resCountry.json();
    renderCountry(dataCountry[0]);
    return `💥You are in ${dataGeo.address.country}`;
  } catch (error) {
    renderError(error);
    // console.error(error.message, '💥Catch block');
    //  reject promise returned from async function
    throw error;
  }
};

// console.log(`1: Will get location`);
// const country = whereAmI();
// console.log('2: ', country);
// whereAmI()
//   .then(res => console.log(`2: ${res}`))
//   .catch(err => console.error(`2: ${err}`))
//   .finally(() => {
//     console.log(`3: Finished getting location`);
//   });
// console.log(`3: Finished getting location`);
// console.log('FIRST');

// (async function () {
//   console.log(`1: Will get location`);
//   try {
//     const res = await whereAmI();
//     console.log(`2: ${res}`);
//   } catch (error) {
//     console.error(`💥${error.message}`);
//   }
//   console.log(`3: Finished getting location`);
// })();

// `https://geocode.xyz/${lat},${lng}?geoit=json`

// (async function (lat = 22, lng = 88) {
//   const res = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//   const data = await res.json();
//   console.log(data);
// })();

const getCapital = function (country) {
  return fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
    .then(res => {
      if (!res.ok) throw new Error(`${country} not found`);
      return res.json();
    })
    .then(data => data[0].capital[0]);
};

let arr = [];
const get3Countries = async function (c1, c2, c3) {
  try {
    // const res = await Promise.all([
    //   fetch(`https://restcountries.com/v3.1/name/${c1}?fullText=true`)
    //     .then(res => {
    //       if (!res.ok) throw new Error(`${c1} not found`);
    //       return res.json();
    //     })
    //     .then(data => data[0].capital[0]),
    //   fetch(`https://restcountries.com/v3.1/name/${c2}?fullText=true`)
    //     .then(res => {
    //       if (!res.ok) throw new Error(`${c2} not found`);
    //       return res.json();
    //     })
    //     .then(data => data[0].capital[0]),
    //   fetch(`https://restcountries.com/v3.1/name/${c3}?fullText=true`)
    //     .then(res => {
    //       if (!res.ok) throw new Error(`${c3} not found`);
    //       return res.json();
    //     })
    //     .then(data => data[0].capital[0]),
    // ]);
    const res = await Promise.all([
      getCapital(c1),
      getCapital(c2),
      getCapital(c3),
    ]);
    console.log(res);
    // res.forEach(function (res) {
    //   const [data] = await res.json();
    //   arr.push(data.capital[0]);
    // });

    // console.log(arr);

    // const resC1 = await fetch(
    //   `https://restcountries.com/v3.1/name/${c1}?fullText=true`
    // );
    // if (!resC1.ok) throw new Error(`💥${c1} not found`);
    // const [dataC1] = await resC1.json();
    // console.log(dataC1);

    // const resC2 = await fetch(
    //   `https://restcountries.com/v3.1/name/${c2}?fullText=true`
    // );
    // if (!resC2.ok) throw new Error(`💥${c2} not found`);
    // const [dataC2] = await resC2.json();
    // console.log(dataC2);

    // const resC3 = await fetch(
    //   `https://restcountries.com/v3.1/name/${c3}?fullText=true`
    // );
    // if (!resC3.ok) throw new Error(`💥${c3} not found`);
    // const [dataC3] = await resC3.json();
    // console.log(dataC3);

    // console.log([dataC1.capital[0], dataC2.capital[0], dataC3.capital[0]]);
  } catch (error) {
    console.error(`💥${error.message}`);
  }
};

// get3Countries(`india`, `japan`, `united states`);
// get3Countries(`india`, `japan`, `usa`);

/*
(async function () {
  try {
    const res = await Promise.race([
      getJSON(`https://restcountries.com/v3.1/name/${`india`}?fullText=true`),
      getJSON(`https://restcountries.com/v3.1/name/${`usa`}?fullText=true`),
      getJSON(`https://restcountries.com/v3.1/name/${`japan`}?fullText=true`),
    ]);
    console.log(res[0].name.common);
  } catch (error) {
    console.error(`💥${error.message}`);
  }
})();
*/
/*
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error(`Request took to long!`));
    }, sec * 1000);
  });
};
(async function () {
  try {
    const res = await Promise.race([
      getJSON(
        `https://restcountries.com/v3.1/name/${`india`}?fullText=true`,
        `💥Country not found`
      ),
      getJSON(
        `https://restcountries.com/v3.1/name/${`japan`}?fullText=true`,
        `💥Country was not found`
      ),
      getJSON(
        `https://restcountries.com/v3.1/name/${`south korea`}?fullText=true`,
        `💥Country was not found`
      ),
      timeout(2),
    ]);
    console.log(res[0].name.common);
  } catch (error) {
    console.error(error.message);
  }
})();
*/

/*
// Promise.allSettled
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.any
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
*/

// (async function () {
//   try {
//     let img = await createImage('img/img-1.jpg');
//     console.log('Image 1 loaded');
//     await wait(3);
//     img.style.display = 'none';

//     img = await createImage('img/img-2.jpg');
//     console.log('Image 2 loaded');
//     await wait(3);
//     img.style.display = 'none';

//     img = await createImage('img/img-3.jpg');
//     console.log('Image 3 loaded');
//     await wait(3);
//     img.style.display = 'none';
//   } catch (error) {
//     console.error(error);
//   }
// })();

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    console.log(imgs);

    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (error) {
    console.error(error);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
