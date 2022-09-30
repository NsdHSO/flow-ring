import {Column, Entity, OneToOne} from 'typeorm';
import {BaseCows} from '../baseCow';
import {NumberInsemination} from './numberInsemination';

@Entity()
export class MilkCow extends BaseCows {
  @OneToOne(
    () => NumberInsemination,
    numberIn => numberIn.milkCowNumber,
    {cascade: true, onDelete: 'CASCADE'},
  )
    numberIn: NumberInsemination;

  @Column()
    ageMonth: number;

  @Column()
    averageOfMilk: number;

  @Column()
    cowInHeat: number;
}
