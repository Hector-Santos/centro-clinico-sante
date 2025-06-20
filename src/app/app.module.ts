import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './../test/test.module';
import { DoctorModule } from '../doctor/doctor.module'; // Importando o módulo de médicos
import { PatientModule } from 'src/patient/patient.module';
import { WeeklyScheduleModule } from 'src/weekly-schedule/weekly-schedule.module';
import { ScheduleExceptionModule } from 'src/schedule-exception/schedule-exception.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TestModule, // Rota automaticamente mapeada via controller do módulo
    DoctorModule, // Importando o módulo de médicos
    PatientModule,
    WeeklyScheduleModule, // Importando o módulo de agendamento semanal
    ScheduleExceptionModule, // Importando o módulo de exceções de agendamento
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
