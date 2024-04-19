import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import axios from 'axios';


@Controller('file')
export class FileController {
  constructor() {}
  
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    console.log(file);
    console.log(file.buffer); // undefined
    console.log(file.size);
    console.log(file.destination)
    console.log(file.mimetype)
    console.log(file.fieldname)
    console.log(file.filename)
    console.log(file.stream) // undefined
    console.log(file.originalname)
   
    try {
      if (!file || !file.buffer) {
        throw new Error('Fichier invalide ou manquant');
      }
      const imageData = new FormData();

      const blob = new Blob([file.buffer], { type: file.mimetype });

      imageData.append('image', blob);
      imageData.append('title', file.originalname);
      
      const response = await axios.post(
        'https://api.imgur.com/3/image',
        imageData,
        {
          headers: {
            Authorization: `Client-ID ${process.env.CLIENT_ID}`,
            //'Content-Type': "multipart/form-data",
          },
        },
      );
      console.log(response.data.data.link);
      return response.data.data.link;

    } catch  (error) {
      console.error(
        'Erreur lors du téléchargement du fichier vers Imgur :',
        error,
      );
      throw new Error('Erreur lors du téléchargement du fichier vers Imgur');
    }
  }
}
