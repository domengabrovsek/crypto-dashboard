'use strict';

const fs = require('fs');

const saveToFile = ({ path, data, overwrite }) => {

  if (fs.existsSync(path) && !overwrite) {
    throw new Error(`File ${path} already exists!`);
  }

  fs.writeFileSync(path, JSON.stringify(data));

  console.log(`File saved to ${path}`);
}

const readFromFile = (path) => {

  // default encoding
  const encoding = 'utf8';

  return JSON.parse(fs.readFileSync(path, { encoding }));
}

const exists = (path) => {
  return fs.existsSync(path);
}

module.exports = {
  saveToFile,
  readFromFile,
  exists
};