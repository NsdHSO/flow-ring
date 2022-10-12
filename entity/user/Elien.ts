import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Email} from '../email/email';

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

  @OneToMany(() => Email, email => email.elien)
    emailMessage: Email;
}
