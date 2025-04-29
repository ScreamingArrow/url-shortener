import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Url } from './url.entity';

@Entity({ name: 'metrics' })
export class Metric extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'number_of_clicks', type: 'int', nullable: false })
  numberOfClicks: number;

  @OneToOne(() => Url, (url) => url.metric)
  url: Url;
}
