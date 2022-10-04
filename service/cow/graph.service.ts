import type {Request, Response} from 'express';
import type {Repository} from 'typeorm';
import {AppDataSource} from '../../data-source';
import {GraphState} from '../../entity/cow/report/graph';
import {ReportState} from '../../entity/cow/report/report';

export class GraphProvider {
  reportRepository: Repository<GraphState>;

  constructor() {
    this.reportRepository = AppDataSource.getRepository(GraphState);
  }

  public async getAllGraph() {
    return this.reportRepository.createQueryBuilder()
      .getMany();
  }

  public async addedNewStateOfGraph(req: Request, response: Response) {
    const newState = new ReportState();
    newState.value = req.body.value ?? '';
    newState.viewValue = req.body.viewValue ?? '';
    return this.reportRepository.save(newState);
  }
}
