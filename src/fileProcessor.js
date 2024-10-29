const fs = require('fs');
const processedFilePath = 'processed.json';

function isFileProcessed(filename) {
  const processedFiles = JSON.parse(fs.readFileSync(processedFilePath, 'utf-8') || '[]');
  return processedFiles.includes(filename);
}

function markFileAsProcessed(filename) {
  const processedFiles = JSON.parse(fs.readFileSync(processedFilePath, 'utf-8') || '[]');
  processedFiles.push(filename);
  fs.writeFileSync(processedFilePath, JSON.stringify(processedFiles));
}

module.exports = { isFileProcessed, markFileAsProcessed };
