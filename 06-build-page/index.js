const path = require('path');
const fs = require('fs');
const distPath = path.join(__dirname, 'project-dist');
const stylesPath = path.join(__dirname, 'styles');
const componentsPath = path.join(__dirname, 'components');
const assetsPath = path.join(__dirname, 'assets');
let htmlString;
fs.mkdir(distPath, { recursive: true }, err => {
  if (err) {
    throw err;
  }
  createHTML();
  bundleStyles();
  copyAssets();
});

function createHTML() {
  const stream = fs.createReadStream(path.join(__dirname, 'template.html'));
  stream.on('data', data => {
    htmlString = data.toString();
    fs.readdir(componentsPath, function (err, files) {
      if (err) {
        throw err;
      }
      files.forEach(file => {
        let stream = fs.createReadStream(path.join(componentsPath, file));
        stream.on('data', data => {
          htmlString = htmlString.replace(`{{${file.slice(0, file.indexOf('.'))}}}`, data);
          fs.writeFile(path.join(distPath, 'index.html'), htmlString, err => {
            if (err) {
              throw err;
            }
          });
        });
      });
    });
  });
}
function bundleStyles() {
  fs.readdir(stylesPath, 'utf-8', (err, files) => {
    if (err) {
      throw err;
    }
    fs.writeFile(path.join(distPath, 'style.css'), '', err => {
      if (err) {
        throw err;
      }
    });
    files.forEach(file => {
      if (path.parse(path.join(stylesPath, file)).ext === '.css') {
        let stream = fs.createReadStream(path.join(stylesPath, file));
        stream.on('data', data => {
          fs.appendFile(path.join(distPath, 'style.css'), data, err => {
            if (err) {
              throw err;
            }
          });
        });
      }
    });
  });
}
function copyAssets() {
  fs.mkdir(path.join(distPath, 'assets'), { recursive: true }, err => {
    if (err) {
      throw err;
    }
    clearFolder(path.join(distPath, 'assets'));
    copy(assetsPath);
  });
}
function copy(folder, subFolder = '') {
  fs.readdir(folder, { withFileTypes: true }, (err, files) => {
    if (err) {
      throw err;
    }
    files.forEach(file => {
      if (file.isDirectory()) {
        fs.mkdir(path.join(distPath, 'assets', file.name), { recursive: true }, err => {
          if (err) {
            throw err;
          }
          clearFolder(path.join(distPath, 'assets', file.name));
          copy(path.join(folder, file.name), file.name);
        });
      } else {
        fs.copyFile(path.join(folder, file.name), path.join(distPath, 'assets', subFolder, file.name), err => {
          if (err) {
            throw err;
          }
        });
      }
    });
  });
}
function clearFolder(folder) {
  fs.readdir(folder, { withFileTypes: true }, (err, files) => {
    if (err) {
      throw err;
    }
    files.forEach(file => {
      if (file.isFile()) {
        fs.unlink(path.join(folder, file.name), err => {
          if (err) {
            throw err;
          }
        });
      }
    });
  });
}
