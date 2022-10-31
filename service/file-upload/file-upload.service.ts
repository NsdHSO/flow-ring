import type {Request, Response} from 'express';
import type {Repository} from 'typeorm';
import {AppDataSource} from '../../data-source';
import {DatabaseFile} from '../../entity/email/databaseFile';

export class FileUploadProvider {
  fileUploadRepository: Repository<DatabaseFile>;

  constructor() {
    this.fileUploadRepository = AppDataSource.getRepository(DatabaseFile);
  }

  public async getAllReport() {
    return this.fileUploadRepository.createQueryBuilder()
      .getMany();
  }

  public async addedNewStateOfReport(dataBuffer: any, fileName: string) {
    const newFile = await this.fileUploadRepository.create({
      fileName,
      data: dataBuffer,
    });

    await this.fileUploadRepository.save(newFile);
    return newFile;
  }
}
