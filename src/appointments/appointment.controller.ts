import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from './dto/appointment.dto';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() appointment: CreateAppointmentDto) {
    return this.appointmentService.create(appointment);
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() appointment: UpdateAppointmentDto) {
    return this.appointmentService.update(id, appointment);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.appointmentService.delete(id);
  }
}
