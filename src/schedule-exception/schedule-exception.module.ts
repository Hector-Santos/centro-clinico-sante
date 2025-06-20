import { Module } from '@nestjs/common';
import { ScheduleExceptionService } from './schedule-exception.service';
import { ScheduleExceptionController } from './schedule-exception.controller';

@Module({
  providers: [ScheduleExceptionService],
  controllers: [ScheduleExceptionController],
  exports: [ScheduleExceptionService],
})
export class ScheduleExceptionModule {}
