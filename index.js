const request = require('request');
const requestPromise = require('request-promise');
const table = require('console.table');

const apiKey = '1f826c7c4325078d3aaa2c64f027cb2b';
const baseWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather?';

requestPromise('http://ipinfo.io').then((body) => {
  const response = JSON.parse(body);
  console.log('\n');
  console.log(`Current weather report for your city, ${response.city}.\n`);
  getWeather(response.city, response.country);
}).catch( err => {
  console.log(err);
});

function getWeather(city, country) {
  const url = `${baseWeatherUrl}q=${city}&appid=${apiKey}&units=metric`;
  requestPromise(url).then( body => {
    const response = JSON.parse(body);
    let desc = '';
    response.weather.forEach(obj => {
      desc = desc + obj.description + ',';
    });

    console.log(desc.slice(0,-1) + '\n');
    console.table(response.main);
  }).catch( err => {
    console.log(err);
  });
}