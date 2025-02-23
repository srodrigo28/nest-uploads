import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from '../prisma/prisma.service'
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  // criando uma estancia do PrismaService para carregar todas as tabelas
  constructor(private readonly prisma: PrismaService) { }

  async create(createCategoryDto: CreateCategoryDto) {
    
    const findCategory = await this.prisma.category.findFirst({
      where: { name: createCategoryDto.name }
    })
    
    if (findCategory) {
      throw new HttpException("Categoria Já existe! ", HttpStatus.UNAUTHORIZED)
    }

    const newCategory = await this.prisma.category.create({
      data: {
        name: createCategoryDto.name
      },
      select: { name: true }
    })
    
    return { "Sucesso: ": newCategory }

  }

  async findAll() {
    const allCategory = await this.prisma.category.findMany({
      orderBy: { created: "desc" }
    });
    return allCategory;
  }

  async findAllNameAsc() {
    const allCategory = await this.prisma.category.findMany({
      orderBy: { name: "asc" }
    });
    return allCategory;
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findFirst({
      where: { id: id }
    })
    
    if (category?.name) return category

    throw new HttpException("Tarefa não foi encontrada! ", HttpStatus.NOT_FOUND)

  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const findCategory = await this.prisma.category.findFirst({
        where: { id: id }
      })

      if (!findCategory) {
        throw new HttpException("Essa categoria não existe!", HttpStatus.NOT_FOUND)
      }

      const category = this.prisma.category.update({
        where: { id: findCategory.id },
        data: updateCategoryDto
      })

      return category;
    } catch (error) {
      throw new HttpException("Falha ao tentar atualizar", HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number) {
    try {
      const findCategory = await this.prisma.category.findFirst({
        where: { id: id }
      })

      if (!findCategory) {
        throw new HttpException("Tarefa não encontrada! ", HttpStatus.NOT_FOUND)
      }

      await this.prisma.category.delete({
        where: { id: findCategory.id }
      })

      return { message: "Category removida com sucesso!" }

    } catch (error) {
      throw new HttpException("Falha ao tentar Excluir",  HttpStatus.BAD_REQUEST)
    }
  }

}