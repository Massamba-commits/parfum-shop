import type {Product} from '../Type/Product';

export const products: Product[] = [{
    id: 1,
    name: 'YARA',
    description: 'Yara est un parfum envoûtant qui capture l’essence de la féminité moderne. Avec ses notes florales délicates et ses accents boisés, Yara incarne l’élégance et la confiance. Ce parfum unique est conçu pour les femmes qui veulent se démarquer et laisser une impression durable.',
    price: 2500,
    image:"/images_Parf/image3.jpeg",
    categorie: 'Catégorie 1',
    quantite: 10,
    video: '/videos/video1',
  },
  {
    id: 2,
    name: 'BOX YARA',
    description: 'La Box Yara est une expérience parfumée complète qui vous permet de découvrir l’univers envoûtant de Yara. Cette boîte élégante contient une sélection de produits exclusifs, notamment le parfum Yara, des échantillons de ses notes les plus captivantes, et des accessoires de beauté assortis. C’est le cadeau parfait pour les amateurs de parfums qui souhaitent plonger dans l’essence de la féminité moderne.',
    price: 7000,
    image:"/images_Parf/box3.jpeg",
    categorie: 'Catégorie 2',
    quantite: 5,
    video: '/videos/video2',
 
  }]
