const path = require('path');
const fs = require('fs');
const { clear } = require('console');
const copyFolder = path.join(__dirname, 'files-copy');
fs.mkdir(copyFolder, { recursive: true }, err => {
  if (err) {
    throw err;
  }
  clearFolder();
  copy();
});

function copy() {
  fs.readdir(path.join(__dirname, 'files'), 'utf-8', (err, files) => {
    if (err) {
      throw err;
    }
    files.forEach(file => {
      fs.copyFile(path.join(__dirname, 'files', file), path.join(copyFolder, file), err => {
        if (err) {
          throw err;
        }
      });
    });
  });
}
function clearFolder() {
  fs.readdir(copyFolder, 'utf-8', (err, files) => {
    if (err) {
      throw err;
    }
    files.forEach(file => {
      fs.unlink(path.join(copyFolder, file), err => {
        if (err) {
          throw err;
        }
      });
    });
  });
}
