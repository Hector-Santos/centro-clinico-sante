import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TestModule } from './test/test.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TestModule, // Rota automaticamente mapeada via controller do módulo
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
