
const path = require('path');
const schedule = require('node-schedule');
const fs = require('fs-extra');

const { INPUT_DIR, OUTPUT_DIR, CHECK_INTERVAL, CHUNK_SIZE } = require('./config');

const { splitFile } = require('./fileSplitter');
const { verifyChunk } = require('./verifier');
const { isFileProcessed, markFileAsProcessed } = require('./fileProcessor');

fs.ensureDirSync(INPUT_DIR);
fs.ensureDirSync(OUTPUT_DIR);
fs.ensureFileSync('processed.json');

// process files in all directories
async function processDirectory(directory) {
  const files = await fs.readdir(directory);
  console.log(files)

  for (const file of files) {

    const filePath = path.join(directory, file);
    console.log(filePath)
    const filestat = await fs.stat(filePath);
    console.log(filestat.isDirectory())

    if (filestat.isDirectory()) {
      await processDirectory(filePath); //call process directory again with file path 
    } 
    else if (!isFileProcessed(filePath)) {
      
      // process the file if it's not processed
      console.log(`Processing file: ${filePath}`);

      const outputFilePath = path.join(OUTPUT_DIR, `${path.basename(file)}-chunk`);
      await splitFile(filePath, outputFilePath, CHUNK_SIZE );


      // validation code
      const isValid = await verifyChunk(filePath, outputFilePath);
      if (isValid) {
        console.log(`file ${filePath} processed successfully with no data loss.`);
        markFileAsProcessed(filePath);
      } 
      else {
        console.error(`data loss detected in file: ${filePath}`);
      }


    } 
    else {
      console.log(`file already processed: ${filePath}`);
    }
  }
}


async function processFiles() {
  try {
    await processDirectory(INPUT_DIR);
  } 
  catch (error) {
    console.error(`Error processFiles: ${error}`);
  }
}

// cron at interval
console.log('File handling application started...');
schedule.scheduleJob(`* ${CHECK_INTERVAL} * * * *`, processFiles);
// processFiles()