import type {Request, Response} from 'express';
import type {Repository} from 'typeorm';
import {AppDataSource} from '../../data-source';
import {ReportState} from '../../entity/cow/report/report';

export class ReportProvider {
  reportRepository: Repository<ReportState>;

  constructor() {
    this.reportRepository = AppDataSource.getRepository(ReportState);
  }

  public async getAllReport() {
    return this.reportRepository.createQueryBuilder()
      .getMany();
  }

  public async addedNewStateOfReport(req: Request, response: Response) {
    const newState = new ReportState();
    newState.value = req.body.value ?? '';
    newState.viewValue = req.body.viewValue ?? '';

    return this.reportRepository.save(newState);
  }
}
