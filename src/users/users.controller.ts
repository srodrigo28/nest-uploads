import { Controller, Post, UseInterceptors, UploadedFile, 
  UploadedFiles, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'node:path'
import * as fs from 'node:fs/promises'
import { randomUUID } from 'node:crypto';

@Controller('users')
export class UsersController {

  // Upload 1 :: Rota sem validação com name image
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async uploadUser(
    @UploadedFile() file: Express.Multer.File
  ){
    const mimeType = file.mimetype;
    const fileExtension = path
          .extname(file.originalname)
          .toLowerCase().substring(1)
    const fileName = `image.${fileExtension}`

    const fileLocale = path.resolve(process.cwd(), 'files', fileName)

    await fs.writeFile(fileLocale, file.buffer)
    return true
  }

  // Upload 2 :: Rota com validação name roudend
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload2')
  async uploadUser2(
    @UploadedFile(
      new ParseFilePipeBuilder()
          .addFileTypeValidator({ fileType: /jpeg|jpg|png/g, })
          .addMaxSizeValidator({ maxSize: 5 * (1024 * 1024) })
          .build({ 
            errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE 
          })
    ) file: Express.Multer.File
  ){
    const mimeType = file.mimetype;
    const fileExtension = path.extname(file.originalname).toLowerCase().substring(1)
    const fileName = `${randomUUID()}.${fileExtension}`

    const fileLocale = path.resolve(process.cwd(), 'files', fileName)

    await fs.writeFile(fileLocale, file.buffer)
    return true
  }

  // Upload 3 :: Rota sem validação name image
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload3')
  async uploadUser3(
    @UploadedFile() file: Express.Multer.File
  ){
    
    const fileExtension = path.extname(file.originalname).toLowerCase().substring(1)
    const fileName = `image1.${fileExtension}`
    const fileLocale = path.resolve(process.cwd(), 'files', fileName)

    await fs.writeFile(fileLocale, file.buffer)
    return true
  }

  // Upload 4 Multiplos :: Rota multiplos videos
  @UseInterceptors(FilesInterceptor('file'))
  @Post('uploads')
  async uploadsUser(
    @UploadedFiles() files: Array<Express.Multer.File>
  ){
    files.forEach(async file => {
      const fileExtension = path
            .extname(file.originalname)
            .toLowerCase()
            .substring(1)
      const fileName = `${randomUUID()}.${fileExtension}`
      const fileLocale = path.resolve(process.cwd(), 'files', fileName)
      
      await fs.writeFile(fileLocale, file.buffer)
    })
    return true
  }

  // Videos ##############3

  // Upload 5 :: Rota Video sem validação // não esquecer de mudar file para movie
  @UseInterceptors(FileInterceptor('movie'))
  @Post('movie')
  async uploadmove( @UploadedFile() file: Express.Multer.File ){
    const fileExtension = path
          .extname(file.originalname)
          .toLowerCase()
          .substring(1)
    const fileName = `video.${fileExtension}`
    const fileLocale = path.resolve(process.cwd(), 'movie', fileName)

    await fs.writeFile(fileLocale, file.buffer)
    return true
  }

  // Upload 6 :: Rota Video com validação // não esquecer de mudar file para movie
  @UseInterceptors(FileInterceptor('movie', {
    limits: { fileSize: 50 * 1024 * 1024 }, // Limite de 50MB por exemplo
    fileFilter: (_, file, cb) => {
      const validExtensions = ['.mp4', '.avi', '.mkv', '.mov', '.flv'];
      const fileExtension = path
            .extname(file.originalname)
            .toLowerCase();
      if (validExtensions.includes(fileExtension)) { cb(null, true )
      } else { new Error('Formato de vídeo não suportado.') }
    }
  }))
  @Post('movie2')
  async uploadmove2( @UploadedFile() file: Express.Multer.File ){
    const fileExtension = path
          .extname(file.originalname)
          .toLowerCase()
          .substring(1)
    const fileName = `video.${fileExtension}`

    const fileLocale = path.resolve(process.cwd(), 'movie', fileName)

    await fs.writeFile(fileLocale, file.buffer)
    return true
  }
}