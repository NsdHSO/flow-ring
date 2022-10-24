import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ChatMessage} from '../email/chatMessage';
import {Permission} from './permission/permission';

@Entity()
export class Elien {
  @PrimaryGeneratedColumn()
    id: number;

  @Column('text')
    name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
    email: string;

  @Column({
    type: 'text',
    nullable: true,
  })
    label: string;

  @Column({
    type: 'text',
    nullable: true,
  })
    role: string;

  @Column('text')
    password: string;

  @Column({
    type: 'text',
    nullable: true,
  })
    token: string;

  @Column({
    type: 'text',
    nullable: true,
  })
    icon: string;

  @ManyToOne(() => Permission, permission => permission.elien)
  @JoinColumn()
    permission: Permission;

  @OneToMany(() => ChatMessage, sender => sender.sender)
  @JoinColumn()
    sender: ChatMessage [];

  @OneToMany(() => ChatMessage, rece => rece.receiver)
  @JoinColumn()
    receiver: ChatMessage[];
}
