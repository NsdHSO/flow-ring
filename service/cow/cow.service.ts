import {AppDataSource} from '../../data-source';
import {MeatCow} from '../../entity/cow/meatCow';

const cowMeatRepository = AppDataSource.getRepository(MeatCow);

export class CowMeatProvider {
  async getAllCows() {
    return cowMeatRepository.createQueryBuilder('cow')
      .getMany();
  }
}

