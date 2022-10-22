import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Inbox} from './inbox';

@Entity()
export class FilterLabel {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    filterPrimary: boolean;

  @Column()
    filterSocial: boolean;

  @Column()
    filterWork: boolean;

  @Column()
    filterFriends: boolean;

  @Column()
    newLabel: boolean;

  @OneToMany(() => Inbox, inbox => inbox.filterLabel)
    filtersLabel: Inbox[];
}
