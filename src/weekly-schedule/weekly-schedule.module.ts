import { Module } from '@nestjs/common';
import { WeeklyScheduleService } from './weekly-schedule.service';
import { WeeklyScheduleController } from './weekly-schedule.controller';

@Module({
  providers: [WeeklyScheduleService],
  controllers: [WeeklyScheduleController],
  exports: [WeeklyScheduleService], // Optional if used elsewhere
})
export class WeeklyScheduleModule {}
