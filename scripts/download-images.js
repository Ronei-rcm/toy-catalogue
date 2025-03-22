const https = require('https');
const fs = require('fs');
const path = require('path');

const images = {
  'hero-banner.jpg': 'https://placehold.co/1920x600',
  'categories/lego.jpg': 'https://placehold.co/400x300',
  'categories/jogos.jpg': 'https://placehold.co/400x300',
  'categories/pelucia.jpg': 'https://placehold.co/400x300',
  'products/lego-millennium-falcon.jpg': 'https://placehold.co/400x400',
  'products/monopoly.jpg': 'https://placehold.co/400x400',
  'products/ursinho-pooh.jpg': 'https://placehold.co/400x400',
  'brands/disney.png': 'https://placehold.co/200x100',
  'brands/lego.png': 'https://placehold.co/200x100',
  'brands/estrela.png': 'https://placehold.co/200x100'
};

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath));
      } else {
        response.resume();
        reject(new Error(`Request Failed With a Status Code: ${response.statusCode}`));
      }
    });
  });
};

const main = async () => {
  for (const [filename, url] of Object.entries(images)) {
    const filepath = path.join('public', 'images', filename);
    const dir = path.dirname(filepath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    try {
      await downloadImage(url, filepath);
      console.log(`Downloaded: ${filename}`);
    } catch (error) {
      console.error(`Error downloading ${filename}:`, error.message);
    }
  }
};

main().catch(console.error); 