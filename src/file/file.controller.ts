import { Controller, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IFile } from './Model/file';

@Controller('file')
export class FileController {
  constructor() {}
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File): IFile {
    console.log(file);
    //return `This is the ${file.originalname}`;
    return file;
  }
}
