import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Inbox} from './inbox';

@Entity()
export class ActionEmail {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    newEmail: boolean;

  @Column()
    inbox: boolean;

  @Column()
    starred: boolean;

  @Column()
    send: boolean;

  @Column()
    draft: boolean;

  @Column()
    spam: boolean;

  @Column()
    important: boolean;

  @Column()
    bin: boolean;

  @OneToMany(() => Inbox, inbox => inbox.filterLabel)
    inboxes: Inbox[];
}
