import type {Request} from 'express';
import type {Repository} from 'typeorm';
import {AppDataSource} from '../../data-source';
import {ChatMessage} from '../../entity/email/chatMessage';
import {Email} from '../../entity/email/email';
import {Elien} from '../../entity/user/Elien';

export class ChatMessageProvider {
  chatMessageRepository: Repository<ChatMessage>;

  emailRepository: Repository<Email>;

  elienRepository: Repository<Elien>;

  constructor() {
    this.chatMessageRepository = AppDataSource.getRepository(ChatMessage);
    this.elienRepository = AppDataSource.getRepository(Elien);
    this.emailRepository = AppDataSource.getRepository(Email);
  }

  public async getAllToDo() {
    return this.chatMessageRepository.createQueryBuilder()
      .getMany();
  }

  public async addedNewMessage(req: Request) {
    const newMessage = new ChatMessage();
    newMessage.email = await this.emailRepository.findOneBy({
      id: parseInt(
        req.params.id,
        10,
      ),
    });
    newMessage.description = req.body.message;
    newMessage.receiver = await this.elienRepository.findOneBy({
      id: parseInt(
        req.body.senderId,
        10,
      ),
    });
    newMessage.sender = await this.elienRepository.findOneBy({
      id: parseInt(
        req.body.elienId,
        10,
      ),
    });
    return this.chatMessageRepository.save(newMessage);
  }

  public async update(req: Request) {
    const newMessage = new ChatMessage();
    newMessage.email = await this.emailRepository.findOneBy({
      id: parseInt(
        req.params.id,
        10,
      ),
    });
    newMessage.description = req.body.message;
    newMessage.receiver = await this.elienRepository.findOneBy({
      id: parseInt(
        req.body.senderId,
        10,
      ),
    });
    newMessage.sender = await this.elienRepository.findOneBy({
      id: parseInt(
        req.body.elienId,
        10,
      ),
    });
    return this.chatMessageRepository.save(newMessage);
  }

  public async delete(req: Request) {}
}
