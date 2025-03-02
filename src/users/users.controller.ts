import { Controller, Post, UseInterceptors, UploadedFile, 
  UploadedFiles, ParseFilePipeBuilder, HttpStatus, 
  Get, ParseIntPipe, Param,
  Body,
  Patch,
  Delete} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'node:path'
import * as fs from 'node:fs/promises'
import { randomUUID } from 'node:crypto';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService){}

  @Get(':id')
  findOneUser(@Param('id', ParseIntPipe) id: number){
    return this.userService.findOne(id)
  }

  @Get()
  findAll(){
    return this.userService.findAll()
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto){
    return this.userService.create(createUserDto)
  }

  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() updatedUserDto: UpdateUserDto){
    return this.userService.update(id, updatedUserDto)
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number){
    return this.userService.delete(id)
  }

  // ### TODAS ROTAS DE UPLOADS ###
  // Upload 1 :: Rota sem validação com name image
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async uploadUser(
    @UploadedFile() file: Express.Multer.File
  ){
    return this.userService.upload1(file)
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

  // Upload 5 :: Videos ##############3

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