import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Data } from './data.db';
import { CreateDataDto } from './data.dto';

@Injectable()
export class DataDao {
  constructor(
    @InjectModel(Data.name, 'local')
    private dataModel: Model<Data>,
  ) {}

  async get(id: string) {
    return this.dataModel.findById(id);
  }

  async getAll() {
    return this.dataModel.find().sort('-updatedAt');
  }

  async create(data: CreateDataDto) {
    return await this.dataModel.create(data);
  }

  async delete(id: string) {
    await this.dataModel.deleteOne({ _id: id });
  }

  async update(id: string, data: string) {
    await this.dataModel.updateOne({ _id: id }, { data });
  }
}
