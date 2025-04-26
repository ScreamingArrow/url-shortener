import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({ name: 'urls' })
export class Url extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name:'original_url', type: 'text', nullable: false })
  originalUrl: string;

  @Column({name:'short_id', type: 'varchar', nullable: false, unique: true })
  shortId: string;
}