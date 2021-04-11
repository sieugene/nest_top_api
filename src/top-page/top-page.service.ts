import { FindTopPageDto } from './dto/find-top-page.dto';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { TopPageModel } from './top-page.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel)
    private readonly topPageModel: ModelType<TopPageModel>,
  ) {}

  async create(dto: CreateTopPageDto) {
    return this.topPageModel.create(dto);
  }

  async getById(id: string) {
    return this.topPageModel.findById(id).exec();
  }

  async getByAlias(alias: string) {
    return this.topPageModel
      .findOne({
        alias,
      })
      .exec();
  }

  async deleteById(id: string) {
    return this.topPageModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: CreateTopPageDto) {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async find({ firstCategory }: FindTopPageDto) {
    return this.topPageModel
      .find(
        {
          firstCategory,
        },
        { alias: 1, secondCategory: 1, title: 1 },
      )
      .exec();
  }
}
