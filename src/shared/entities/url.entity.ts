import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";

@Entity({ name: 'urls' })
export class Url extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({name:'original_url', type: 'text', nullable: false })
  originalUrl: string;

  @Column({name:'short_id', type: 'varchar', nullable: false, unique: true })
  shortId: string;

  @ManyToOne(
    () => User,
    (user) => user.urls,
  )
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}