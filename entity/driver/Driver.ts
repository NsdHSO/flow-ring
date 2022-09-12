import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
}                   from "typeorm";
import { Location } from "./Location";

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id : number;

  @Column( "text" )
  name : string;

  @Column( "text" )
  description : string;

  @Column( "boolean" )
  license : boolean;

  @Column( "text" )
  email : string;

  @Column( "text" )
  dataOfBirth : string;

  @Column()
  classOfDriver: string;

  @OneToOne( ()=> Location )
  @JoinColumn()
  location : Location;
}
