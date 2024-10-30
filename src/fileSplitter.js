const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

async function splitFile(inputPath, outputFilePath, chunkSize) {

  chunkSize = chunkSize  // MB
  // console.log(chunkSize)

  // using split command
  const fileExtension = path.extname(inputPath);
  console.log(fileExtension)

  return new Promise((resolve, reject) => {

    const splitCommand = `split -b ${chunkSize}M -d "${inputPath}" "${outputFilePath}-" --additional-suffix="${fileExtension}"`;
    exec(splitCommand, (error, stdout, stderr)=> {

      if (error) {
        reject(`error split command: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`error split command standard: ${stderr}`);
        return;
      }
      console.log(`split command executed successfully`);
      resolve();

    })

  })

  // -------------------------------------------------------------------------------

  // File read stream approach
  // return new Promise((resolve, reject) => {

  //   const readStream = fs.createReadStream(inputPath, { highWaterMark: chunkSize } );
  //   let index = 0;

  //   readStream.on('data', (chunk) => {

  //     console.log(`event on readstream and current index is: ${index}`)
  //     const chunkFilePath = `${outputFilePath}-${index++}`;
  //     fs.writeFileSync(chunkFilePath, chunk);  // new chunk file created with new path
  //     console.log(`created chunk: ${chunkFilePath}`); 
    
  //   });

  //   readStream.on('end', () => {
  //     // file read stream complete
  //     resolve();
  //   });

  //   readStream.on('error', (error) => {
  //     reject(error);
  //   });
  // });

}



module.exports = { splitFile };
