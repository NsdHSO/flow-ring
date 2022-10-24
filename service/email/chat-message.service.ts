import type {Request} from 'express';
import type {Repository} from 'typeorm';
import {AppDataSource} from '../../data-source';
import {ChatMessage} from '../../entity/email/chatMessage';
import {Elien} from '../../entity/user/Elien';

export class ChatMessageProvider {
  chatMessageRepository: Repository<ChatMessage>;

  elienRepository: Repository<Elien>;

  constructor() {
    this.chatMessageRepository = AppDataSource.getRepository(ChatMessage);
    this.elienRepository = AppDataSource.getRepository(Elien);
  }

  public async getAllToDo() {
    return this.chatMessageRepository.createQueryBuilder()
      .getMany();
  }

  public async addedNewMessage(req: Request) {
    const newMessage = new ChatMessage();
    await this.elienRepository.createQueryBuilder('elien')
      .where('elien.id = :id', {id: req.body.elienId})
      .getOne()
      .then((r: any) => newMessage.receiver = r)
      .catch(err => {
        console.error(err);
      });
    await this.elienRepository.createQueryBuilder('elien')
      .where('elien.id = :id', {id: req.body.senderId})
      .getOne()
      .then((r: any) => newMessage.sender = r)
      .catch(err => {
        console.error(err);
      });
    newMessage.description = req.body.message;
    return this.chatMessageRepository.save(newMessage);
  }

  public async update(req: Request) {
  }

  public async delete(req: Request) {
  }
}
