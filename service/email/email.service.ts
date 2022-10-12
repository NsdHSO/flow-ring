import type {Request, Response} from 'express';
import type {Repository} from 'typeorm';
import {AppDataSource} from '../../data-source';
import {Email} from '../../entity/email/email';
import {Message} from '../../entity/email/message';
import {Elien} from '../../entity/user/Elien';

export class EmailProvider {
  emailRepository: Repository<Email>;

  elienRepository: Repository<Elien>;

  constructor() {
    this.emailRepository = AppDataSource.getRepository(Email);
    this.elienRepository = AppDataSource.getRepository(Elien);
  }

  public async getAllReport() {
    return this.emailRepository.createQueryBuilder()
      .getMany();
  }

  public async addedNewEmail(req: Request, response: Response) {
    const email = new Email();
    const message = new Message();
    email.title = req.body.title;
    email.label = req.body.label;
    email.visible = true;
    email.typeOfPeople = '';
    email.vote = false;
    email.timestamp = new Date();
    message.description = req.body.description;
    email.description = message;
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
