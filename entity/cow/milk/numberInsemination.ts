import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation} from 'typeorm';
import {MilkCow} from './milkCow';

@Entity()
export class NumberInsemination {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    lact: number;

  @Column()
    insemination: number;

  @OneToOne(() => MilkCow, milkCow => milkCow.numberIn, {onDelete: 'CASCADE'})
  @JoinColumn()
    milkCowNumber: Relation<MilkCow>;
}
