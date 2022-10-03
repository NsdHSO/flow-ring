import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class ReportState {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    viewValue: string;

  @Column()
    value: string;
}
