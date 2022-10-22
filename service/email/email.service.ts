import type {Request, Response} from 'express';
import type {Repository} from 'typeorm';
import {ILike} from 'typeorm';
import {AppDataSource} from '../../data-source';
import {Email} from '../../entity/email/email';
import {Elien} from '../../entity/user/Elien';

export class EmailProvider {
  emailRepository: Repository<Email>;

  elienRepository: Repository<Elien>;

  constructor() {
    this.emailRepository = AppDataSource.getRepository(Email);
    this.elienRepository = AppDataSource.getRepository(Elien);
  }

  public async getAllEmail(item = 10, skip = 1) {
    const total = await this.emailRepository.count();
    const emails = await this.emailRepository.createQueryBuilder('email')
      .innerJoinAndSelect('email.description', 'description')
      .leftJoinAndSelect('email.elien', 'elien')
      .take(item)
      .skip(skip)
      .getMany();
    return {
      emails, total,
    };
  }

  public async findAfterQuery(query = 'test') {
    return this.emailRepository.createQueryBuilder('email')
      .innerJoinAndSelect('email.description', 'description')
      .leftJoinAndSelect('email.elien', 'elien')
      .where({title: ILike(`%${String(query)}%`)})
      .getMany();
  }

  public async addedNewEmail(req: Request, response: Response) {
    const email = new Email();
    email.title = req.body.title;
    email.label = req.body.label;
    email.visible = true;
    email.typeOfPeople = '';
    email.vote = false;
    email.timestamp = new Date();
    email.description = req.body.description;
    switch (req.body.lable) {
      case 'Primary':
        email.label = 0;
        break;
      case 'Work':
        email.label = 1;
        break;
      case 'Friend':
        email.label = 2;
        break;
      default:
        email.label = 3;
        break;
    }

    await this.elienRepository.findOne({
      where: {
        id: 3,
      },
    })
      .then(elien => {
        email.elien = elien;
      });
    return this.emailRepository.save(email);
  }
}
