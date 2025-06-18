// src/test/test.controller.ts
import { Controller, Post } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  async create() {
    const id = await this.testService.createTestEntry();
    return { success: true, id };
  }
}
