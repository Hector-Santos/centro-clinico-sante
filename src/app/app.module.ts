import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppointmentModule } from '../appointments/appointment.module';
import { CacheModule } from '../cache/cache.module';
import { DoctorModule } from '../doctor/doctor.module'; // Importando o módulo de médicos
import { InvoiceModule } from '../invoice/invoice.module';
import { PatientModule } from '../patient/patient.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    DoctorModule, // Importando o módulo de médicos
    PatientModule, // Importando o módulo de pacientes
    AppointmentModule, // Importando o módulo de agendamentos
    InvoiceModule, // Importando o módulo de faturas
    CacheModule, // Importando o módulo de cache
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
