import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookedDto, DayAvailabilityDto, ScheduleDto } from './dto/schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get(':doctorId')
  getScheduleByDoctorId(
    @Param('doctorId') doctorId: string,
  ): Promise<ScheduleDto> {
    return this.scheduleService.getScheduleByDoctorId(doctorId);
  }

  @Get(':doctorId/weekly')
  getWeeklyAvailability(
    @Param('doctorId') doctorId: string,
  ): Promise<DayAvailabilityDto[]> {
    return this.scheduleService.getWeeklyAvailability(doctorId);
  }

  @Get(':doctorId/weekly/:dayIndex')
  getDayAvailability(
    @Param('doctorId') doctorId: string,
    @Param('dayIndex') dayIndex: string,
  ): Promise<DayAvailabilityDto> {
    return this.scheduleService.getDayAvailability(doctorId, +dayIndex);
  }

  @Get(':doctorId/booked')
  getBooked(@Param('doctorId') doctorId: string): Promise<BookedDto[]> {
    return this.scheduleService.getBooked(doctorId);
  }

  @Get(':doctorId/booked/:patientId')
  getBookedForPatient(
    @Param('doctorId') doctorId: string,
    @Param('patientId') patientId: string,
  ): Promise<BookedDto> {
    return this.scheduleService.getBookedForPatient(doctorId, patientId);
  }

  @Post()
  createSchedule(@Body() data: ScheduleDto): Promise<void> {
    return this.scheduleService.createSchedule(data);
  }

  @Post(':doctorId/booked')
  createBooked(
    @Param('doctorId') doctorId: string,
    @Body() booked: BookedDto,
  ): Promise<void> {
    return this.scheduleService.createBooked(doctorId, booked);
  }

  @Put(':doctorId')
  updateSchedule(
    @Param('doctorId') doctorId: string,
    @Body() data: Partial<ScheduleDto>,
  ): Promise<void> {
    return this.scheduleService.updateSchedule(doctorId, data);
  }

  @Put(':doctorId/weekly')
  updateWeekly(
    @Param('doctorId') doctorId: string,
    @Body() weekly: DayAvailabilityDto[],
  ): Promise<void> {
    return this.scheduleService.updateWeekly(doctorId, weekly);
  }

  @Put(':doctorId/weekly/:dayIndex')
  updateDay(
    @Param('doctorId') doctorId: string,
    @Param('dayIndex') dayIndex: string,
    @Body() day: DayAvailabilityDto,
  ): Promise<void> {
    return this.scheduleService.updateDay(doctorId, +dayIndex, day);
  }

  @Put(':doctorId/booked')
  updateBooked(
    @Param('doctorId') doctorId: string,
    @Body() booked: BookedDto,
  ): Promise<void> {
    return this.scheduleService.updateBooked(doctorId, booked);
  }

  @Delete(':doctorId')
  deleteSchedule(@Param('doctorId') doctorId: string): Promise<void> {
    return this.scheduleService.deleteSchedule(doctorId);
  }

  @Delete(':doctorId/booked/:patientId')
  deleteBooked(
    @Param('doctorId') doctorId: string,
    @Param('patientId') patientId: string,
  ): Promise<void> {
    return this.scheduleService.deleteBooked(doctorId, patientId);
  }
}
