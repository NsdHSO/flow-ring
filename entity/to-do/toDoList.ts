import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class ToDoList {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    check: boolean;

  @Column('text')
    description: string;

  @Column()
    rating: boolean;
}
