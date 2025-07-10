import { Module } from '@nestjs/common';
import { ScheduleExceptionController } from './schedule-exception.controller';
import { ScheduleExceptionService } from './schedule-exception.service';

@Module({
  controllers: [ScheduleExceptionController],
  providers: [ScheduleExceptionService],
})
export class ScheduleExceptionModule {}
