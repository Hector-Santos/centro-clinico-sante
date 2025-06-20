import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { WeeklyScheduleDto } from './dto/weekly-schedule.dto';
import { WeeklyScheduleService } from './weekly-schedule.service';

@Controller('weekly-schedules')
export class WeeklyScheduleController {
  constructor(private readonly service: WeeklyScheduleService) {}

  @Post()
  async create(@Body() dto: WeeklyScheduleDto) {
    return await this.service.create(dto);
  }

  @Get()
  async findAll() {
    return await this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: Partial<WeeklyScheduleDto>,
  ) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
