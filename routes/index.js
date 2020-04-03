var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

function getRawData() {
  let localParsed = [];
  return new Promise((res, rej) => {
    // console.log('promise:', localParsed.length)
    fs.createReadStream(path.resolve(__dirname, '../data', 'covid-confirmed-global.csv'))
      .pipe(csv.parse({headers: true}))
      .on('error', error => rej(error))
      .on('data', data => localParsed.push(data))
      .on('end', function () {
        console.log('before', localParsed.length)
        res(localParsed);
      });
  });
}


router.get('/', async function (req, res, next) {
  let result;
  try {
    result = await getRawData();
    console.log('res:', result.length)
    let greeceData = result.find(el => el['Country/Region'] === 'Greece');
    console.log(greeceData)
    res.render('index', {data: greeceData});
  } catch (e) {
    console.log(e)
  }
});

module.exports = router;
