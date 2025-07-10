import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InvoiceDto, UpdateInvoiceDto } from './dto/invoice.dto';
import { InvoiceService } from './invoice.service';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly service: InvoiceService) {}

  @Post()
  async create(@Body() dto: InvoiceDto) {
    return await this.service.create(dto);
  }

  @Get()
  async findAll() {
    return await this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateInvoiceDto,
  ): Promise<{ message: string }> {
    const success = await this.service.update(id, dto);
    if (!success) {
      throw new NotFoundException('Invoice not found');
    }
    return { message: 'Invoice successfully updated' };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
