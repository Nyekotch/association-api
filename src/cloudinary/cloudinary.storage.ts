import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.config';

export const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'association-blog',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
} as any);
