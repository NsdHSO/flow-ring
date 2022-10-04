import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class GraphState {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    viewValue: string;

  @Column({unique: true})
    value: string;
}
