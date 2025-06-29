import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';

@Module({
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService], // Optional if used elsewhere
})
export class PatientModule {}
