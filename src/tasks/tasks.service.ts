import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService){}

  async create(createTaskDto: CreateTaskDto) {
    const tarefaExists = await this.prisma.task.findFirst();

   // if(tarefaExists){}
    
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

  async findAll() {
    const allTasks = await this.prisma.task.findMany();
    return allTasks;
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findFirst({
      where: { id: id }
    }) 
    if(task?.name) return task

    throw new HttpException("Tarefa não foi encontrada! ", HttpStatus.NOT_FOUND)

    // return { "Error: " : "Nenhum registor disponivel"};
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
