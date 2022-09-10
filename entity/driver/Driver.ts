import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity ()
export class Driver {
  @PrimaryGeneratedColumn ()
  id : number

  @Column ("text")
  name : string

  @Column ("text")
  descriprion : string

  @Column ("text")
  filename : string

  @Column ("text")
  license : boolean
}
