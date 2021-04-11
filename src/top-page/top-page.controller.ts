import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import {
  NOT_FOUND_ALIAS_ERROR,
  NOT_FOUND_TOP_PAGE_ERROR,
} from './top-page.constants';
import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  Patch,
  HttpCode,
  UsePipes,
  ValidationPipe,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopPageService } from './top-page.service';
import { IdValidationPipe } from './../pipes/id-validation.pipe';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @UseGuards(new JwtAuthGuard())
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateTopPageDto) {
    return this.topPageService.create(dto);
  }

  @UseGuards(new JwtAuthGuard())
  @Get(':id')
  async getById(@Param('id', IdValidationPipe) id: string) {
    const page = await this.topPageService.getById(id);
    if (!page) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }
    return page;
  }

  @Get('byAlias/:alias')
  async get(@Param('alias') alias: string) {
    const find = await this.topPageService.getByAlias(alias);
    if (!find) {
      throw new NotFoundException(NOT_FOUND_ALIAS_ERROR);
    }
    return find;
  }

  @UseGuards(new JwtAuthGuard())
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedTopPage = await this.topPageService.deleteById(id);
    if (!deletedTopPage) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
    }
  }

  @UseGuards(new JwtAuthGuard())
  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: CreateTopPageDto) {
    return this.topPageService.updateById(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindTopPageDto) {
    return this.topPageService.find(dto);
  }
}
