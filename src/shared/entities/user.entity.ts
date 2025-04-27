import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Url } from "./url.entity";
import { BaseEntity } from "./base.entity";

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @OneToMany(() => Url, (url) => url.user)
  urls: Url[];
}