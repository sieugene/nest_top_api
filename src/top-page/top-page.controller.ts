import { TopPageDto } from './dto/find-top-page.dto';
import { TopPageModel } from './top-page.model';
import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('top-page')
export class TopPageController {
  // constructor(private readonly configService: ConfigService) {}
  @Post('create')
  async create(@Body() dto: Omit<TopPageModel, '_id'>) {
    return;
  }

  @Get('get/:alias')
  async get(@Param('alias') alias: string) {
    return;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return;
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: TopPageModel) {
    return;
  }

  @HttpCode(200)
  @Post()
  async find(@Body() dto: TopPageDto) {
    return;
  }
}
