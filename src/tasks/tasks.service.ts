import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service'
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { ResponseTaskDto } from './dto/response-task.dto';

@Injectable()
export class TasksService {
  // criando uma estancia do PrismaService para carregar todas as tabelas
  constructor(private readonly prisma: PrismaService) { }

  async create(createTaskDto: CreateTaskDto)  {
    
    const findTask = await this.prisma.task.findFirst({
      where: { name: createTaskDto.name }
    })
    
    if (findTask) {
      throw new HttpException("Tarefa Já existe! ", HttpStatus.UNAUTHORIZED)
    }

    const newTask = await this.prisma.task.create({
      data: {
        name: createTaskDto.name,
        description: createTaskDto.description,
        completed: false,
      },
      select: { name: true }
    })
    
    return { "Sucesso: ": newTask }

  }

  async findAll() : Promise<ResponseTaskDto[]> {
    const allTasks = await this.prisma.task.findMany({
      orderBy: { created: "desc" }
    });
    return allTasks;
  }

  async findAllNameAsc() : Promise<ResponseTaskDto[]> {
    const allTasks = await this.prisma.task.findMany({
      orderBy: { name: "asc" }
    });
    return allTasks;
  }

  async findAllCompleTrue() : Promise<ResponseTaskDto[]> {
    const allTasks = await this.prisma.task.findMany({
      orderBy: { completed: "asc" }
    });
    return allTasks;
  }

  async findAllPagination(paginationDTO: PaginationDTO): Promise<ResponseTaskDto[]> {
    const { limit = 10, offset = 0 } = paginationDTO;
    //console.log(paginationDTO)
    
    const allTasks = await this.prisma.task.findMany({
      take: limit, skip: offset
    });
    return allTasks;
  }

  async findOne(id: number) : Promise<ResponseTaskDto> {
    const task = await this.prisma.task.findFirst({
      where: { id: id }
    })
    
    if (task?.name) return task

    throw new HttpException("Tarefa não foi encontrada! ", HttpStatus.NOT_FOUND)

  }

  async update(id: number, updateTaskDto: UpdateTaskDto) : Promise<ResponseTaskDto> {
    try {
      const findTask = await this.prisma.task.findFirst({
        where: { id: id }
      })

      if (!findTask) {
        throw new HttpException("Essa tarefa não existe!", HttpStatus.NOT_FOUND)
      }

      const task = this.prisma.task.update({
        where: { id: findTask.id },
        data: updateTaskDto
      })

      return task;
    } catch (error) {
      throw new HttpException("Falha ao tentar atualizar", HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number) {
    try {
      const findTask = await this.prisma.task.findFirst({
        where: { id: id }
      })

      if (!findTask) {
        throw new HttpException("Tarefa não encontrada! ", HttpStatus.NOT_FOUND)
      }

      await this.prisma.task.delete({
        where: { id: findTask.id }
      })

      return { message: "Tarefa removida com sucesso!" }

    } catch (error) {
      throw new HttpException("Falha ao tentar Excluir",  HttpStatus.BAD_REQUEST)
    }
  }

}