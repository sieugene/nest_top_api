import { ReviewModel } from './review.model';
import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';

@Controller('review')
export class ReviewController {
  @Post('create')
  async create(@Body() dto: Omit<ReviewModel, '_id'>) {
    return;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return;
  }

  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') productId: string) {
    return;
  }
}
