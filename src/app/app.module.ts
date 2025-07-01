import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from '../doctor/doctor.module'; // Importando o módulo de médicos
import { PatientModule } from 'src/patient/patient.module';
import { WeeklyScheduleModule } from 'src/weekly-schedule/weekly-schedule.module';
import { ScheduleExceptionModule } from 'src/schedule-exception/schedule-exception.module';
import { AppointmentModule } from 'src/appointments/appointment.module';
import { InvoiceModule } from 'src/invoice/invoice.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    DoctorModule, // Importando o módulo de médicos
    PatientModule, // Importando o módulo de pacientes
    WeeklyScheduleModule, // Importando o módulo de agendamento semanal
    ScheduleExceptionModule, // Importando o módulo de exceções de agendamento
    AppointmentModule, // Importando o módulo de agendamentos
    InvoiceModule, // Importando o módulo de faturas
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
