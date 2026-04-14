export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categorie: string;
  quantite: number;
  video: string; // Propriété optionnelle pour la vidéo de présentation
}