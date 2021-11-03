const path = require('path');
const fs = require('fs');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
const stylesPath = path.join(__dirname, 'styles');
fs.readdir(stylesPath, 'utf-8', (err, files) => {
  if (err) {
    throw err;
  }
  fs.writeFile(bundlePath, '', err => {
    if (err) {
      throw err;
    }
  });
  files.forEach(file => {
    if (path.parse(path.join(stylesPath, file)).ext === '.css') {
      let stream = fs.createReadStream(path.join(stylesPath, file));
      stream.on('data', data => {
        fs.appendFile(bundlePath, data, err => {
          if (err) {
            throw err;
          }
        });
      });
    }
  });
});
