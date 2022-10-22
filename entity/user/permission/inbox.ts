import {Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ActionEmail} from './actionEmail';
import {FilterLabel} from './label';

@Entity()
export class Inbox {
  @PrimaryGeneratedColumn()
    id: number;

  @ManyToOne(
    () => ActionEmail,
    filter => filter.id,
    {cascade: true, onDelete: 'CASCADE', lazy: true},
  )
    actionEmail: ActionEmail;

  @ManyToOne(
    () => FilterLabel,
    filter => filter.id,
    {cascade: true, onDelete: 'CASCADE', lazy: true},
  )
    filterLabel: FilterLabel;
}
