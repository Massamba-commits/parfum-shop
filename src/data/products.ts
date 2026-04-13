import type {Product} from '../Type/Product';

export const products: Product[] = [{
    id: 1,
    name: 'Parfum 1',
    description: 'Description du parfum 1',
    price: 10000,
    imageUrl: 'https://example.com/parfum1.jpg',
    categorie: 'Catégorie 1',
    quantite: 10
  },
  {
    id: 2,
    name: 'Parfum 2',
    description: 'Description du parfum 2',
    price: 60,
    imageUrl: 'https://example.com/parfum2.jpg',
    categorie: 'Catégorie 1',
    quantite: 5
  },
  {
    id: 3,
    name: 'Parfum 3',
    description: 'Description du parfum 3',
    price: 40,
    imageUrl: 'https://example.com/parfum3.jpg',
    categorie: 'Catégorie 2',
    quantite: 8
  },
  {
    id: 4,
    name: 'Parfum 4',
    description: 'Description du parfum 4',                     
    price: 55,      
    imageUrl: 'https://example.com/parfum4.jpg',
    categorie: 'Catégorie 2',
    quantite: 12
  }]
