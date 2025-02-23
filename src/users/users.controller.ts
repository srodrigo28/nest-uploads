import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'node:path'
import * as fs from 'node:fs/promises'
import { randomUUID } from 'node:crypto';

@Controller('users')
export class UsersController {

  // Upload 1
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async uploadUser(
    @UploadedFile() file: Express.Multer.File
  ){
    const mimeType = file.mimetype;
    const fileExtension = path.extname(file.originalname).toLowerCase().substring(1)
    const fileName = `${randomUUID()}.${fileExtension}`
    //const fileName = fileExtension
    console.log(fileName)

    const fileLocale = path.resolve(process.cwd(), 'files', fileName)

    await fs.writeFile(fileLocale, file.buffer)

    return true
  }
}
