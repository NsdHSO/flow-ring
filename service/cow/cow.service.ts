import type {Request} from 'express';
import type {Repository} from 'typeorm';
import {AppDataSource} from '../../data-source';
import {MeatCow} from '../../entity/cow/meatCow';

export class CowMeatProvider {
  cowMeatRepository: Repository<MeatCow>;

  constructor() {
    this.cowMeatRepository = AppDataSource.getRepository(MeatCow);
  }

  async getAllCows() {
    return this.cowMeatRepository.createQueryBuilder('cow')
      .getMany();
  }

  async addedCow(req: Request) {
    const cow = new MeatCow();
    cow.howMuchEats = req.body.howMuchEats ?? 0;
    cow.numberOfLiveCattle = req.body.numberOfLiveCattle ?? 0;
    cow.age = req.body.age ?? 0;
    cow.birth = req.body.birth ?? 0;
    this.cowMeatRepository.createQueryBuilder('cow')
      .where({number: req.body.number})
      .getOneOrFail()
      .then(resp => {
        if (resp !== undefined) {
          throw new Error('Duplicate ');
        }
      },
      );
    cow.kg = req.body.kg ?? 0;
    return this.cowMeatRepository.save(cow);
  }
}

