import type {Request, Response} from 'express';
import type {Repository} from 'typeorm';
import {AppDataSource} from '../../data-source';
import {MilkCow} from '../../entity/cow/milk/milkCow';
import {NumberInsemination} from '../../entity/cow/milk/numberInsemination';

const {Parser} = require('json2csv');
const converter = require('json-2-csv');

export class CowMilkProvider {
  cowMilkRepository: Repository<MilkCow>;

  constructor() {
    this.cowMilkRepository = AppDataSource.getRepository(MilkCow);
  }

  async getAllCows(req: Request, resp: Response) {
    if (req.params.page === undefined || req.params.items === undefined) {
      return resp.status(400)
        .send('Bad Request');
    }

    const item = parseInt(req.params.items, 10);
    const skip = parseInt(req.params.page, 10);
    console.log(item, skip);
    return this.cowMilkRepository.createQueryBuilder('cow')
      .leftJoinAndSelect('cow.numberIn', 'numberIn')
      .take(item)
      .skip(skip)
      .getMany();
  }

  async insertNewCow(req: Request, response: Response) {
    const cow = new MilkCow();
    cow.birth = req.body.birth;
    cow.kg = req.body.kg;
    cow.howMuchEats = req.body.howMuchEats;
    cow.numberOfLiveCattle = req.body.numberOfLiveCattle;
    cow.age = req.body.age;
    cow.state = req.body.state;
    cow.group = req.body.group;
    cow.gynecologicalStatus = req.body.gynecologicalStatus;
    cow.ageMonth = req.body.ageMonth;
    cow.averageOfMilk = req.body.averageOfMilk;
    cow.cowInHeat = req.body.cowInHeat;
    cow.numberIn = new NumberInsemination();
    cow.numberIn.lact = req.body.numberIn.lact;
    cow.numberIn.insemination = req.body.numberIn.insemination;
    cow.numberFromEar = req.body.numberFromEar;
    await this.cowMilkRepository.save(cow)
      .then(re => response.status(200)
        .send(re));
  }

  public async modifiedOneCow(req: Request, response: Response) {
    await this.cowMilkRepository.findOne({
      where: {
        id: parseInt(req.params.id, 10),
      },
    })
      .then(cow => {
        cow[Object.keys(req.body)[0].split(':')[0]] = Object.values(req.body)[0];
        void this.cowMilkRepository.save(cow)
          .then(cow => {
            if (cow) {
              return response.status(200)
                .send(cow);
            }

            response.status(404)
              .send('Not found!');
          });
      })
      .catch(err => {
        response.status(500)
          .send('Not found ');
      });
  }

  public async deleteCow(req: Request, response: Response) {
    return this.cowMilkRepository.delete({id: parseInt(req.params.id, 10)})
      .then(cows => response.status(200)
        .send(cows))
      .catch(err => {
        response.status(500)
          .send(err);
      },
      );
  }

  public async downloadData(req: Request, response: Response) {
    await this.getAllCows(req, response)
      .then(resp => {
        const header = Object.keys(resp[0]);
        const parser = new Parser(header);
        const csv = parser.parse(resp);
        response.setHeader('Content-Type', 'text/csv');
        response.setHeader('Content-Disposition', 'attachment; filename=tutorials.csv');
        response.status(200)
          .end(csv);
      });
  }
}
