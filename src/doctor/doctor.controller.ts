import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Put,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto, DoctorDto, UpdateDoctorDto } from './dto/doctor-dto';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  async create(@Body() doctor: CreateDoctorDto): Promise<DoctorDto> {
    return this.doctorService.create(doctor);
  }

  @Get()
  async findAll(): Promise<DoctorDto[]> {
    return this.doctorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DoctorDto> {
    return await this.doctorService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() doctor: UpdateDoctorDto,
  ): Promise<void> {
    await this.doctorService.update(id, doctor);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.doctorService.delete(id);
  }
}
