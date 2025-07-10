import { Controller, Post, Body, UsePipes } from '@nestjs/common';

import { MatchDtoPipe } from '../common/pipes/match-dto.pipe';
import { ScheduleExceptionType } from './dto/schedule-exception.dto';

import {
  WeekDayExceptionDto,
  ReplaceWeekDayDto,
  ReplaceDayTimeDto,
  ReplaceBookingDto,
  AvailabilityExceptionDto,
  BookingExceptionDto,
} from './dto/schedule-exception.dto';
import { ScheduleExceptionService } from './schedule-exception.service';

@Controller('schedule-exception')
export class ScheduleExceptionController {
  constructor(private readonly service: ScheduleExceptionService) {}

  @Post('cancel-weekday')
  @UsePipes(new MatchDtoPipe(WeekDayExceptionDto))
  cancelWeekDay(@Body() dto: WeekDayExceptionDto) {
    return this.service.create(dto, ScheduleExceptionType.CancelWeekDay);
  }

  @Post('add-weekday')
  @UsePipes(new MatchDtoPipe(WeekDayExceptionDto))
  addWeekDay(@Body() dto: WeekDayExceptionDto) {
    return this.service.create(dto, ScheduleExceptionType.AddWeekDay);
  }

  @Post('replace-weekday')
  @UsePipes(new MatchDtoPipe(ReplaceWeekDayDto))
  replaceWeekDay(@Body() dto: ReplaceWeekDayDto) {
    return this.service.create(dto, ScheduleExceptionType.ReplaceWeekDay);
  }

  @Post('cancel-availability')
  @UsePipes(new MatchDtoPipe(AvailabilityExceptionDto))
  cancelAvailability(@Body() dto: AvailabilityExceptionDto) {
    return this.service.create(dto, ScheduleExceptionType.CancelAvailability);
  }

  @Post('add-availability')
  @UsePipes(new MatchDtoPipe(AvailabilityExceptionDto))
  addAvailability(@Body() dto: AvailabilityExceptionDto) {
    return this.service.create(dto, ScheduleExceptionType.AddAvailability);
  }

  @Post('replace-availability')
  @UsePipes(new MatchDtoPipe(AvailabilityExceptionDto))
  replaceAvailability(@Body() dto: AvailabilityExceptionDto) {
    return this.service.create(dto, ScheduleExceptionType.ReplaceAvailability);
  }

  @Post('replace-day-time')
  @UsePipes(new MatchDtoPipe(ReplaceDayTimeDto))
  replaceDayAndTime(@Body() dto: ReplaceDayTimeDto) {
    return this.service.create(dto, ScheduleExceptionType.ReplaceDayAndTime);
  }

  @Post('cancel-booking')
  @UsePipes(new MatchDtoPipe(BookingExceptionDto))
  cancelBooking(@Body() dto: BookingExceptionDto) {
    return this.service.create(dto, ScheduleExceptionType.CancelBooking);
  }

  @Post('add-booking')
  @UsePipes(new MatchDtoPipe(BookingExceptionDto))
  addBooking(@Body() dto: BookingExceptionDto) {
    return this.service.create(dto, ScheduleExceptionType.AddBooking);
  }

  @Post('replace-booking')
  @UsePipes(new MatchDtoPipe(ReplaceBookingDto))
  replaceBooking(@Body() dto: ReplaceBookingDto) {
    return this.service.create(dto, ScheduleExceptionType.ReplaceBooking);
  }
}
