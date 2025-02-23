import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as path from 'node:path'
import * as fs from 'node:fs/promises'
import { randomUUID } from 'node:crypto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async upload1(file: Express.Multer.File){
    const imageNumber = Date.now();
    const mimeType = file.mimetype;
    const fileExtension = path
          .extname(file.originalname)
          .toLowerCase().substring(1)
    const fileName = `image.${imageNumber}.${fileExtension}`
    const fileLocale = path.resolve(process.cwd(), 'files', fileName)

    await fs.writeFile(fileLocale, file.buffer)

    return { "url" : "http://localhost:8080/files/"+fileName }
  }
}
