const { Image } = require('../db');

const images = [
  { url: 'https://www.guiarepsol.com/content/dam/repsol-guia/contenidos-imagenes/comer/top-de-gastronomia/los-restaurantes-mas-antiguos-de-espana/gr-cms-media-featured_images-none-759f762b-7965-41cd-a979-da49509e205d-1.jpg' },
  { url: 'https://www.guiarepsol.com/content/dam/repsol-guia/contenidos-imagenes/comer/top-de-gastronomia/los-restaurantes-mas-antiguos-de-espana/gr-cms-media-featured_images-none-759f762b-7965-41cd-a979-da49509e205d-1.jpg' },
  { url: 'https://www.guiarepsol.com/content/dam/repsol-guia/contenidos-imagenes/comer/top-de-gastronomia/los-restaurantes-mas-antiguos-de-espana/gr-cms-media-featured_images-none-759f762b-7965-41cd-a979-da49509e205d-1.jpg' },
  { url: 'https://www.guiarepsol.com/content/dam/repsol-guia/contenidos-imagenes/comer/top-de-gastronomia/los-restaurantes-mas-antiguos-de-espana/gr-cms-media-featured_images-none-759f762b-7965-41cd-a979-da49509e205d-1.jpg' },
  { url: 'https://www.guiarepsol.com/content/dam/repsol-guia/contenidos-imagenes/comer/top-de-gastronomia/los-restaurantes-mas-antiguos-de-espana/gr-cms-media-featured_images-none-759f762b-7965-41cd-a979-da49509e205d-1.jpg' },
  { url: 'https://www.guiarepsol.com/content/dam/repsol-guia/contenidos-imagenes/comer/top-de-gastronomia/los-restaurantes-mas-antiguos-de-espana/gr-cms-media-featured_images-none-759f762b-7965-41cd-a979-da49509e205d-1.jpg' },
  { url: 'https://www.guiarepsol.com/content/dam/repsol-guia/contenidos-imagenes/comer/top-de-gastronomia/los-restaurantes-mas-antiguos-de-espana/gr-cms-media-featured_images-none-759f762b-7965-41cd-a979-da49509e205d-1.jpg' },
  { url: 'https://www.guiarepsol.com/content/dam/repsol-guia/contenidos-imagenes/comer/top-de-gastronomia/los-restaurantes-mas-antiguos-de-espana/gr-cms-media-featured_images-none-759f762b-7965-41cd-a979-da49509e205d-1.jpg' },
  { url: 'https://www.guiarepsol.com/content/dam/repsol-guia/contenidos-imagenes/comer/top-de-gastronomia/los-restaurantes-mas-antiguos-de-espana/gr-cms-media-featured_images-none-759f762b-7965-41cd-a979-da49509e205d-1.jpg' },
  { url: 'https://www.guiarepsol.com/content/dam/repsol-guia/contenidos-imagenes/comer/top-de-gastronomia/los-restaurantes-mas-antiguos-de-espana/gr-cms-media-featured_images-none-759f762b-7965-41cd-a979-da49509e205d-1.jpg' },
];
const seedImg = async () => {
  await Image.bulkCreate(images);
  console.log('Done!');
};
seedImg();
