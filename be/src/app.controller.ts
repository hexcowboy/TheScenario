import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateDataDto } from './data.dto';

@Controller('data')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAll() {
    return this.appService.getAll();
  }

  @Post()
  create(@Body() data: CreateDataDto) {
    return this.appService.create(data.data);
  }

  @Delete()
  delete(@Body('id') id: string) {
    return this.appService.delete(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: CreateDataDto) {
    return this.appService.update(id, data.data);
  }
}
