import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Elien {
  @PrimaryGeneratedColumn()
  id : number;

  @Column( "text" )
  name : string;

  @Column( {
    type     : "text",
    nullable : true,
  } )
  email : string;

  @Column( {
    type     : "text",
    nullable : true,
  } )
  role : string;

  @Column( "text" )
  password : string;

  @Column( {
    type     : "text",
    nullable : true,
  } )
  token : string;
}
