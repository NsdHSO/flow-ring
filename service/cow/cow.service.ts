import type {Request, Response} from 'express';
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

  async addedCow(req: Request, response: Response) {
    const cow = new MeatCow();
    cow.howMuchEats = req.body.howMuchEats ?? 0;
    cow.numberOfLiveCattle = req.body.numberOfLiveCattle ?? 0;
    cow.age = req.body.age ?? 0;
    cow.birth = req.body.birth ?? 0;
    await this.cowMeatRepository.createQueryBuilder('cow')
      .where('cow.number = :number', {number: req.body.number})
      .getOne()
      .then(resp => {
        if (resp !== null) {
          console.log(resp);
          response.status(400)
            .send('Duplicate ');
          throw new Error('Duplicate');
        } else {
          if (req.body.number !== undefined) {
            cow.number = req.body.number;
          } else {
            response.status(400)
              .send('Not number of cow');
          }

          throw new Error('Not number ');
        }
      },
      );
    cow.kg = req.body.kg ?? 0;
    return this.cowMeatRepository.save(cow);
  }

  async modifiedOneCow(request: Request, response: Response) {
    await this.cowMeatRepository.findOne({
      where: {
        id: parseInt(
          request.params.id,
          10,
        ),
      },
    })
      .then(cow => {
        cow[Object.keys(request.body)[0].split(':')[0]] = Object.values(request.body)[0];
        void this.cowMeatRepository.save(cow)
          .then(cow => {
            if (cow) {
              return response.status(200)
                .send(cow);
            }

            response.status(404)
              .send('Not found!');
          });
      }).catch(err => {
        response.status(500)
          .send('Not found ');
      });
  }
}

