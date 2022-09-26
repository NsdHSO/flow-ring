import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {BaseCows} from './baseCow';

@Entity()
export class MeatCow extends BaseCows {
  @Column()
    numberOfLiveCattle: number;

  @Column()
    howMuchEats: number;
}
