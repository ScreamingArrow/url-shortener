import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { Exclude } from 'class-transformer';

export abstract class BaseEntity {
    @Exclude({ toPlainOnly: false })
    @CreateDateColumn({
      type: 'timestamp',
      name: 'created_at',
      default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;
  
    @Exclude({ toPlainOnly: false })
    @UpdateDateColumn({
      type: 'timestamp',
      name: 'updated_at',
      default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
  
    @Exclude({ toPlainOnly: false })
    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt: Date | null;
  }