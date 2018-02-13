const src = 'ImprotyokaluPakki.xlsx';
const dst = 'improv_exercises.json';
const options = null;
const callback = (err, data) => console.error(err, data);

convertExcel = require('excel-as-json').processFile;
convertExcel(src, dst, options, callback);
