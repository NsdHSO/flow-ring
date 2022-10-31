import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Elien} from '../user/Elien';
import {ChatMessage} from './chatMessage';
import {DatabaseFile} from './databaseFile';
import {Message} from './message';

@Entity()
export class Email {
  @PrimaryGeneratedColumn()
    id: number;

  @Column('text')
    title: string;

  @Column('boolean')
    vote: boolean;

  @Column({nullable: true})
    label: number;

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
    elienSender: Elien;

  @OneToMany(
    () => ChatMessage,
    rece => rece.receiver,
    {cascade: ['insert', 'update'], eager: true},
  )
    messages: ChatMessage[];

  @JoinColumn()
  @OneToOne(() => DatabaseFile, {nullable: true})
    file: DatabaseFile;
}
