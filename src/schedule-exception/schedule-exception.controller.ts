import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateScheduleExceptionDto,
  ScheduleExceptionDto,
} from './dto/schedule-exception.dto';
import { ScheduleExceptionService } from './schedule-exception.service';

@Controller('schedule-exceptions')
export class ScheduleExceptionController {
  constructor(private readonly service: ScheduleExceptionService) {}

  @Post()
  async create(@Body() dto: CreateScheduleExceptionDto) {
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
    @Body() dto: Partial<ScheduleExceptionDto>,
  ) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
