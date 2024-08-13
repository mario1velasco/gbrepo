const fs = require('fs-extra');

const sourceDir = 'dist/apps/unsplash/browser';
const tempDir = 'dist/apps/unsplash-app'; // Introduce a temporary directory
const finalDir = 'dist/apps/unsplash';

// 1. Move to a temporary directory to avoid conflicts
fs.move(sourceDir, tempDir, { overwrite: true }, (err) => {
  if (err) {
    return console.error('Error moving to temporary directory:', err);
  }

  // 2. Move from the temporary directory to the final destination
  fs.move(tempDir, finalDir, { overwrite: true }, (err) => {
    if (err) {
      return console.error('Error moving to final directory:', err);
    } else {
      console.log('Post-build script executed successfully!');
      console.log('Files successfully moved to the final destination!');
    }
  });
});
