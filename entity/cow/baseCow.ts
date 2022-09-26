import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

export class BaseCows {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    number: number;

  @Column()
    kg: number;

  @Column()
    birth: string;

  @Column()
    age: number;
}
