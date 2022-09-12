import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Location {

  @PrimaryGeneratedColumn()
  id : number;

  @Column()
  city : string;

  @Column()
  zipCode : string;

  @Column()
  phone : string;
}
