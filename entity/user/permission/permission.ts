import {Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Inbox} from './inbox';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
    id: number;

  @OneToOne(() => Inbox)
  @JoinColumn()
    inbox: Inbox;
}
