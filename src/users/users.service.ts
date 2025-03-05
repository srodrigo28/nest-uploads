import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as path from 'node:path'
import * as fs from 'node:fs/promises'
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly hashingService: HashingServiceProtocol
  ){}

  // sem criptor
  async create(createUserDto: CreateUserDto) {
    try{
      const user = await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          passwordHash: createUserDto.password
        },
        select:{ id:true, name: true, email: true }
      })
      return user;
    }catch(error){
      console.log(error)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)
    }
  }

  // com criptor
  async createCriptor(createUserDto: CreateUserDto) {
    try{
      const passwordHash = await this.hashingService.hash(createUserDto.password)
      const user = await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          passwordHash: passwordHash
        },
        select:{ id:true, name: true, email: true }
      })
      return user;
    }catch(error){
      console.log(error)
      throw new HttpException('Usuário não inserido', HttpStatus.NOT_FOUND)
    }
  }

  async findAll() {
    const user = await this.prisma.user.findMany()

    if(user) return user;

    throw new HttpException('Não tem registros', HttpStatus.NOT_FOUND)
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({
      where: { id: id },
      select: { id: true, email: true, Task: true }
    })

    if(user) return user;

    throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try{
      // verifica se existe o id do usuário
      const user = await this.prisma.user.findFirst({
        where: { id: id },
      })

      // se não existir retorna o erro
      if(!user) { 
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND) 
      }
      // caso exista então atualiza
      const updateUser = await this.prisma.user.update({
        where: { id: user.id },
        data: { 
          name: updateUserDto.name ? updateUserDto.name : user.name, 
          email: updateUserDto.email ? updateUserDto.email : user.email, 
          passwordHash: updateUserDto.password ? user.passwordHash : user.passwordHash
      },
      // retorna os dados
      select: { id: true, name: true, email: true }
    })

    return updateUser;
    
    } catch(error) {
      console.log(error)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)
    }
  }

  async delete(id: number) {
    try{
      const user = await this.prisma.user.findFirst({
        where: { id: id }
      })

      if(!user){ throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND) }
    
      await this.prisma.user.delete({
        where: { id: user.id}
      })
    }catch(error){
      console.log(error)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)
    }
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
