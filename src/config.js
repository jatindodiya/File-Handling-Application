const path = require('path');

module.exports = {
  INPUT_DIR: path.join(__dirname, '..', 'input'),
  OUTPUT_DIR: path.join(__dirname, '..', 'output'),
  CHECK_INTERVAL: 5,  // 5 minutes
  CHUNK_SIZE: 10  // chunk size in MB
};