import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
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

  @OneToOne(() => Permission)
  @JoinColumn()
    permission: Permission;
}
