import { Injectable } from '@nestjs/common';
import { DataDao } from './data.dao';

@Injectable()
export class AppService {
  constructor(private readonly dataDao: DataDao) {}

  async getAll() {
    return (await this.dataDao.getAll()).map((d) => ({
      id: d._id,
      data: d.data,
    }));
  }

  async create(data: string) {
    const created = await this.dataDao.create({ data });
    return { id: created._id, data: created.data };
  }

  async delete(id: string) {
    await this.dataDao.delete(id);
  }

  async update(id: string, data: string) {
    await this.dataDao.update(id, data);
  }
}
