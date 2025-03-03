import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TaskUtils } from './tasks.utils';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ApiExceptionFilter } from 'src/common/filters/exception-filter';
import { AuthAdminGuard } from 'src/common/guards/admin.guard';

@Module({
  imports: [PrismaModule],
  controllers: [TasksController],
  providers: [TasksService, TaskUtils,
    {
      provide: APP_FILTER, useClass: ApiExceptionFilter
    },
    {
      provide: APP_GUARD, useClass: AuthAdminGuard
    },
    { 
      provide: 'KEY_TOKEN', useValue: "token_123456"
    }
  ],
})
export class TasksModule {}
