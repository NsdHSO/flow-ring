import type {Request, Response} from 'express';
import type {Repository} from 'typeorm';
import {AppDataSource} from '../../data-source';
import {ToDoList} from '../../entity/to-do/toDoList';

export class ToDoProvider {
  toDoListRepository: Repository<ToDoList>;

  constructor() {
    this.toDoListRepository = AppDataSource.getRepository(ToDoList);
  }

  public async getAllToDo() {
    return this.toDoListRepository.createQueryBuilder()
      .getMany();
  }

  public async addedNewToDo(req: Request) {
    const newState = new ToDoList();
    newState.check = false;
    newState.rating = false;
    newState.description = req.body.description;
    return this.toDoListRepository.save(newState);
  }

  public async update(req: Request) {
    await this.toDoListRepository.findOne({
      where: {
        id: parseInt(req.params.id, 10),
      },
    })
      .then(cow => {
        cow[Object.keys(req.body)[0].split(':')[0]] = Object.values(req.body)[0];
        this.toDoListRepository.save(cow);
      });
  }

  public async delete(req: Request) {
    await this.toDoListRepository.findOne({
      where: {
        id: parseInt(req.params.id, 10),
      },
    })
      .then(async cow => this.toDoListRepository.delete(cow),
      );
  }
}
