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
      .getMany()
      .then(array => {
        if (array.length === 0) {
          return [];
        }

        return array;
      });
  }

  async getCowById(cowId: number) {
    return this.cowMeatRepository.createQueryBuilder('cow')
      .where('cow.id=:id', {id: cowId})
      .getOne();
  }

  async addedCow(req: Request, response: Response) {
    const cow = new MeatCow();
    cow.numberFromEar = req.body.numberFromEar;
    cow.kg = req.body.kg ?? 0;
    cow.birth = req.body.birth ?? 0;
    cow.howMuchEats = req.body.howMuchEats ?? 0;
    cow.numberOfLiveCattle = req.body.numberOfLiveCattle ?? 0;
    cow.age = req.body.age ?? 0;
    cow.state = req.body.state;
    cow.group = req.body.group;
    cow.gynecologicalStatus = req.body.gynecologicalStatus;
    cow.gender = req.body.gender;
    return this.cowMeatRepository.save(cow);
  }

  async modifiedOneCow(request: Request, response: Response) {
    await this.cowMeatRepository.findOne({
      where: {
        id: parseInt(request.params.id, 10),
      },
    })
      .then(cow => {
        cow[Object.keys(request.body)[0].split(':')[0]] = Object.values(request.body)[0];
        void this.cowMeatRepository.save(request.body)
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

  public async deleteCow(request: Request, response: Response) {
    await this.cowMeatRepository.createQueryBuilder()
      .delete()
      .from(MeatCow)
      .where('id = :id', {id: request.params.id})
      .execute()
      .then(resp => response.status(200)
        .send(resp))
      .catch(err => response.status(500)
        .send(err));
  }

  async getAllCowsGraph() {
    const inseminated = await this.takeHowMuchCowSpecificState('Inseminated');
    const early = await this.takeHowMuchCowSpecificState('Early');
    const pregnant = await this.takeHowMuchCowSpecificState('Pregnant');
    const calf = await this.takeHowMuchCowSpecificState('Calf');
    return [inseminated, early, pregnant, calf];
  }

  private async takeHowMuchCowSpecificState(state: string): Promise<number | MeatCow[]> {
    return this.cowMeatRepository.createQueryBuilder('cow')
      .where('cow.state=:stateId', {stateId: state})
      .getMany()
      .then(array => {
        if (array.length === 0) {
          return [].length;
        }

        return array.length;
      });
  }
}

