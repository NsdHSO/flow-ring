import type {Request, Response} from 'express';
import type {Repository} from 'typeorm';
import {AppDataSource} from '../../data-source';
import {MeatCow} from '../../entity/cow/meatCow';
import {Driver} from '../../entity/driver/Driver';

export class DashboardProvider {
  cowMeatRepository: Repository<MeatCow>;

  driverRepository: Repository<Driver>;

  constructor() {
    this.cowMeatRepository = AppDataSource.getRepository(MeatCow);
    this.driverRepository = AppDataSource.getRepository(Driver);
  }

  async getAllDashboardData() {
    let driver;
    let meat;
    const data = [];
    driver = await this.driverRepository.count();
    meat = await this.cowMeatRepository.count();
    data.push({
      title: 'Total Driver',
      howMuch: driver,
      feedback: parseFloat((Math.random() * 10).toFixed(2)),
      icon: 'fa_solid:truck-monster',
    });
    data.push({
      title: 'Total Cow Of Meat',
      howMuch: meat,
      feedback: parseFloat((Math.random() * 10).toFixed(2)),
      icon: 'fa_solid:cloud-meatball',
    });
    return data;
  }

  async addedCow(req: Request, response: Response) {
  }

  async modifiedOneCow(request: Request, response: Response) {
  }

  public async deleteCow(request: Request, response: Response) {
  }
}

