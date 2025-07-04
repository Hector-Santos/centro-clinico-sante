import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { CreateDoctorDto, DoctorDto, UpdateDoctorDto } from './dto/doctor-dto';
import { DoctorService } from './doctor.service';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  async create(@Body() dto: CreateDoctorDto): Promise<DoctorDto> {
    return this.doctorService.create(dto);
  }

  @Get()
  async findAll(): Promise<DoctorDto[]> {
    return this.doctorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DoctorDto> {
    const doctor = await this.doctorService.findOne(id);
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    return doctor;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateDoctorDto,
  ): Promise<void> {
    const success = await this.doctorService.update(id, dto);
    if (!success) throw new NotFoundException('Doctor not found');
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    const success = await this.doctorService.remove(id);
    if (!success) throw new NotFoundException('Doctor not found');
    return { message: 'Doctor successfully deleted' };
  }
}
