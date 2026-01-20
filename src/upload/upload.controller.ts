import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { cloudinaryStorage } from '../cloudinary/cloudinary.storage';

@Controller('upload')
export class UploadController {
  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: cloudinaryStorage,
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return {
      imageUrl: file.path, // URL Cloudinary
    };
  }
}