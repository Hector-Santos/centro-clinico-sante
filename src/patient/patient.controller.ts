import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/patient-dto';
import { UpdatePatientDto } from './dto/patient-dto';
import { PatientDto } from './dto/patient-dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async create(@Body() data: CreatePatientDto): Promise<PatientDto> {
    return this.patientService.create(data);
  }

  @Get()
  async findAllPatients(): Promise<PatientDto[]> {
    return this.patientService.findAll();
  }

  @Get(':id')
  async findPatientById(@Param('id') id: string): Promise<PatientDto | null> {
    return this.patientService.findOne(id);
  }

  @Patch(':id')
  async updatePatient(
    @Param('id') id: string,
    @Body() data: UpdatePatientDto,
  ): Promise<PatientDto | null> {
    return this.patientService.update(id, data);
  }

  @Delete(':id')
  async deletePatient(@Param('id') id: string): Promise<boolean> {
    return this.patientService.remove(id);
  }
}
