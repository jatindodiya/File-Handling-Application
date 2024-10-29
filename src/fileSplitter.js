const fs = require('fs');
const path = require('path');

async function splitFile(inputPath, outputFilePath, chunkSize) {

  chunkSize = chunkSize * 1024 * 1024
  // console.log(chunkSize)

  return new Promise((resolve, reject) => {

    const readStream = fs.createReadStream(inputPath, { highWaterMark: chunkSize } );
    let index = 0;

    readStream.on('data', (chunk) => {

      console.log(`event on readstream and current index is: ${index}`)
      const chunkFilePath = `${outputFilePath}-${index++}`;
      fs.writeFileSync(chunkFilePath, chunk);  // new chunk file created with new path
      console.log(`created chunk: ${chunkFilePath}`); 
    
    });

    readStream.on('end', () => {
      // file read stream complete
      resolve();
    });

    readStream.on('error', (error) => {
      reject(error);
    });
  });
}



module.exports = { splitFile };
