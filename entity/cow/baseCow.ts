import {Column, PrimaryGeneratedColumn} from 'typeorm';

export class BaseCows {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    numberFromEar: number;

  @Column()
    kg: number;

  @Column()
    birth: string;

  @Column()
    howMuchEats: number;

  @Column()
    numberOfLiveCattle: number;

  @Column()
    age: number;

  @Column()
    state: string;

  @Column()
    group: number;

  @Column()
    gynecologicalStatus: string;
}
