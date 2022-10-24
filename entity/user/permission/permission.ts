import {Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Elien} from '../Elien';
import {Inbox} from './inbox';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
    id: number;

  @OneToOne(() => Inbox)
  @JoinColumn()
    inbox: Inbox;

  @OneToMany(() => Elien, elien => elien.permission)
    elien: Elien[];
}
