import fs from 'fs';
import sharp from 'sharp';

(async () => {
  await sharp('frontend/public/favicon.svg')
    .resize(64, 64)
    .toFile('frontend/public/favicon.ico');
})();
