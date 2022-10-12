import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Elien} from '../user/Elien';
import {Message} from './message';

@Entity()
export class Email {
  @PrimaryGeneratedColumn()
    id: number;

  @Column('text')
    title: string;

  @Column('boolean')
    vote: boolean;

  @Column('text')
    label: string;

  @Column({
    type: 'text',
    nullable: true,
  })
    typeOfPeople: string;

  @Column({type: 'timestamp', nullable: true})
    timestamp: Date;

  @Column({type: 'boolean', nullable: true})
    visible: boolean;

  @OneToOne(() => Message, {cascade: true, onDelete: 'CASCADE'})
  @JoinColumn()
    description: Message;

  @ManyToOne(() => Elien, elien => elien.email, {cascade: true, onDelete: 'CASCADE'})
    elien: Elien;
}
