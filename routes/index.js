var express = require('express');
var router = express.Router();
const request = require('request');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const d3 = require('d3');

function getRawData() {
  let localParsed = [];
  return new Promise((res, rej) => {
    request.get('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv')  
    .pipe(csv.parse({headers: true}))
      .on('error', error => rej(error))
      .on('data', data => localParsed.push(data))
      .on('end', function () {
        let formatedDatesAndNumbers =[];
        console.log('before', localParsed.length)
        let greeceData = localParsed.find(el => el['Country/Region'] === 'Greece');
        for(let prop in greeceData) {
          if(prop !== 'Province/State' && prop !== 'Country/Region' && prop !== 'Lat' && prop !== 'Long'){
            formatedDatesAndNumbers.push({
              date: prop,
              num: greeceData[prop]
            })
          };
        }
        console.log(formatedDatesAndNumbers);
        
        res(formatedDatesAndNumbers);
      });
  });
}



router.get('/', async function (req, res, next) {
  let result;
  try {
    result = await getRawData();
    console.log('res:', result.length)
    res.render('index', {data: result});
  } catch (e) {
    console.log(e)
  }
});

router.get('/greece-data', async function (req, res, next) {
  let result;
  try {
    result = await getRawData();
    res.json(result)
  } catch (e) {
    console.log(e)
  }
});

module.exports = router;
