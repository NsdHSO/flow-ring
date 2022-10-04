import type {Request, Response} from 'express';
import type {Repository} from 'typeorm';
import {AppDataSource} from '../../data-source';
import {MilkCow} from '../../entity/cow/milk/milkCow';
import {NumberInsemination} from '../../entity/cow/milk/numberInsemination';
import {GraphProvider} from './graph.service';
import {ReportProvider} from './report.service';

export class CowMilkProvider {
  cowMilkRepository: Repository<MilkCow>;

  private readonly _reportProvider: ReportProvider;

  private readonly _graphProvider: GraphProvider;

  constructor() {
    this.cowMilkRepository = AppDataSource.getRepository(MilkCow);
    this._reportProvider = new ReportProvider();
    this._graphProvider = new GraphProvider();
  }

  async getAllCows(req: Request, resp: Response) {
    if (req.params.page === undefined || req.params.items === undefined) {
      return resp.status(400)
        .send('Bad Request');
    }

    const allItems = await this.cowMilkRepository.count();
    const item = parseInt(req.params.items, 10);
    const skip = parseInt(req.params.page, 10);
    const report = await this._reportProvider.getAllReport();
    const graph = await this._graphProvider.getAllGraph();
    return {
      items: await this.cowMilkRepository.createQueryBuilder('cow')
        .leftJoinAndSelect('cow.numberIn', 'numberIn')
        .take(item)
        .skip(skip)
        .getMany(),
      allItems,
      report,
      graph,
    };
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
}
