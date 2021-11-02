const path = require('path');
const fs = require('fs');
const secretPath = path.join(__dirname, 'secret-folder');

fs.readdir(secretPath, 'utf-8', (err, files) => {
  if (err) {
    throw err;
  }
  files.forEach(file => {
    fs.stat(path.join(secretPath, file), (error, stats) => {
      if (error) {
        throw error;
      }
      if (stats.isFile()) {
        console.log(
          path.parse(path.join(secretPath, file)).name +
            ' - ' +
            path.parse(path.join(secretPath, file)).ext.slice(1) +
            ' - ' +
            stats.size +
            'b',
        );
      }
    });
  });
});
