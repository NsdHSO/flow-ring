import type { Request, Response } from 'express';
import type { Repository } from 'typeorm';
import { ILike } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { ChatMessage } from '../../entity/email/chatMessage';
import { Email } from '../../entity/email/email';
import { Elien } from '../../entity/user/Elien';

export class EmailProvider {
  emailRepository: Repository<Email>;

  chatMessageRepository: Repository<ChatMessage>;

  elienRepository: Repository<Elien>;

  constructor() {
    this.emailRepository = AppDataSource.getRepository(Email);
    this.elienRepository = AppDataSource.getRepository(Elien);
    this.chatMessageRepository = AppDataSource.getRepository(ChatMessage);
  }

  public async getAllEmail(item = 10, skip = 1) {
    const total = await this.emailRepository.count();
    const emails = await this.emailRepository.createQueryBuilder('email')
      .innerJoinAndSelect('email.description', 'description')
      .leftJoinAndSelect('email.elienSender', 'elien')
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

    email.elienSender = await this.elienRepository.findOne({where: {id: req.body.elienId}});
    email.timestamp = new Date();
    const emailMessages = Array<ChatMessage>();
    if (req.body.chatMessages.length > 0) {
      for (const chatMessage of req.body.chatMessages) {
        const message = new ChatMessage();
        message.description = chatMessage.description;
        await this.elienRepository.findOne({where: {id: chatMessage.senderId}})
          .then(senderID => {
           message.sender = senderID;
          });
        message.timestamp = new Date();
        await this.elienRepository.findOne({where: {id: chatMessage.receiverId}})
          .then(receiveMessageOnPort => {
            message.receiver = receiveMessageOnPort;
          });
        emailMessages.push(message);
      }
    }

    email.messages = await emailMessages;
    await this.searchSenderAndSetOnEmail(req, email);
    await this.emailRepository.save(email);
    await this._setEmailAndSave(emailMessages, email);
    return 'INSERT';
  }

  public async findById(item: number, skip: number, id: number) {
    const email = await this.emailRepository.createQueryBuilder('email')
      .where('email.id =:id', {id})
      .getOne();
    if (skip === 0) {
      skip = 1;
    }
    email.messages = await this.chatMessageRepository.createQueryBuilder('chat')
      .where({email})
      .leftJoinAndSelect('chat.receiver', 'receiver')
      .leftJoinAndSelect('chat.sender', 'sender')
      .offset(item * skip)
      .limit(item)
      .getMany();


    return {
      email,
      sender: await email.messages[0]?.sender,
      receiver: await email.messages[0]?.receiver,
    };
  }

  private async searchSenderAndSetOnEmail(
    req: Request<any, any, any, any, any>,
    email: Email): Promise<void> {
    await this.elienRepository.findOne({
      where: {
        name: req.body.name,
      },
    })
      .then(elien => {
        email.elienSender = elien;
      });
  }

  private async _setEmailAndSave(
    emailMessages: ChatMessage[], email: Email): Promise<void> {
    for (const emailMessageG of emailMessages) {
      emailMessageG.email = email;
      await this.chatMessageRepository.save(emailMessageG);
    }
  }
}
