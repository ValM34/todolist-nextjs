/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['tailwindui.com', 'images.unsplash.com'], // Ajoutez ici les domaines autorisés pour les images
    dangerouslyAllowSVG: true, // Permet le rendu des SVG
  },
};

export default nextConfig;
