import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreatePatientDto } from './dto/patient-dto';
import { UpdatePatientDto } from './dto/patient-dto';
import { PatientDto } from './dto/patient-dto';
import { PatientService } from './patient.service';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async create(@Body() patient: CreatePatientDto): Promise<PatientDto> {
    return this.patientService.create(patient);
  }

  @Get()
  async findAllPatients(): Promise<PatientDto[]> {
    return this.patientService.findAll();
  }

  @Get(':id')
  async findPatientById(@Param('id') id: string): Promise<PatientDto> {
    return this.patientService.findOne(id);
  }

  @Put(':id')
  async updatePatient(
    @Param('id') id: string,
    @Body() patient: UpdatePatientDto,
  ): Promise<void> {
    await this.patientService.update(id, patient);
  }

  @Delete(':id')
  async deletePatient(@Param('id') id: string): Promise<void> {
    await this.patientService.remove(id);
  }
}
