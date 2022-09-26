import type {Request} from 'express';
import {AppDataSource} from '../../data-source';
import {MeatCow} from '../../entity/cow/meatCow';

const cowMeatRepository = AppDataSource.getRepository(MeatCow);

export class CowMeatProvider {
  async getAllCows() {
    return cowMeatRepository.createQueryBuilder('cow')
      .getMany();
  }

  async addedCow(req: Request) {
    const cow = new MeatCow();
    cow.howMuchEats = req.body.howMuchEats;
    cow.numberOfLiveCattle = req.body.numberOfLiveCattle;
    cow.age = req.body.age;
    cow.birth = req.body.birth;
    cow.number = req.body.number;
    cow.kg = req.body.kg;
    return cowMeatRepository.save(cow);
  }
}

