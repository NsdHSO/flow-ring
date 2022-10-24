import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Elien} from '../user/Elien';
import {Email} from './email';

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    description: string;

  @ManyToOne(() => Elien, elien => elien.sender)
  @JoinColumn()
    sender: Elien;

  @ManyToOne(() => Elien, elien => elien.receiver)
  @JoinColumn()
    receiver: Elien;

  @ManyToOne(() => Email, elien => elien.messages)
  @JoinColumn()
    email: Email;
}

