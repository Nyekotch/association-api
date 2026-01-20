import { v2 as cloudinary } from 'cloudinary';

// Configuration avec fallback
if (process.env.CLOUDINARY_URL) {
  cloudinary.config(process.env.CLOUDINARY_URL);
} else {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// Vérification
console.log('Cloudinary config:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  has_api_key: !!process.env.CLOUDINARY_API_KEY,
  has_api_secret: !!process.env.CLOUDINARY_API_SECRET,
  has_url: !!process.env.CLOUDINARY_URL,
});

export default cloudinary;
