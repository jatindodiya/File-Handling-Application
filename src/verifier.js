const fs = require('fs-extra');
const path = require('path');

async function getFileSize(filePath) {
  const stats = await fs.stat(filePath);
  return stats.size;
}

async function verifyChunk(originalFile, chunkPrefix) {

  // compare original file with total chunk size
  const originalSize = await getFileSize(originalFile);
  console.log(originalSize)
  

  const chunkFiles = fs.readdirSync(path.dirname(chunkPrefix))
    .filter(file => file.startsWith(path.basename(chunkPrefix)));
  console.log(chunkFiles)

  let totalChunkSize = 0;

  for (const chunkFile of chunkFiles) {
    
    const chunkPath = path.join(path.dirname(chunkPrefix), chunkFile);
    totalChunkSize += await getFileSize(chunkPath);
  }

  return originalSize === totalChunkSize;
}

module.exports = { verifyChunk };
