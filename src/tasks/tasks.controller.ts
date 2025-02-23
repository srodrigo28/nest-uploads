import { Controller, Get, Post, Body, Patch, Param, 
  Delete, Query, ParseIntPipe, 
  UseInterceptors} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { LoggerInterceptor } from 'src/common/interceptors/logger.interceptor';
import { BodyCreateTaskInterceptor } from 'src/common/interceptors/body-create-task.interceptor';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';

@Controller('tasks')
@UseInterceptors(LoggerInterceptor, AddHeaderInterceptor)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseInterceptors(BodyCreateTaskInterceptor)
  create(@Body() createTaskDto: CreateTaskDto) {
    
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get("pagination") // http://localhost:8080/tasks?limit=10&offset=0
  
  findAllPagination(@Query() paginationDTO: PaginationDTO) {

    return this.tasksService.findAllPagination(paginationDTO);
  }

  @Get(':id')
  //findOne(@Param('id') id: string) {
  findOne(@Param('id', ParseIntPipe) id: number) {
    
    console.log(id);
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    
    return this.tasksService.remove(+id);
  }
}
