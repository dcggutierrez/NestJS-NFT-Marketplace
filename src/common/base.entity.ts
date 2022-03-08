import {
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  export class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ default: null })
    @CreateDateColumn({
      type: 'timestamp',
      default: () => 'LOCALTIMESTAMP',
    })
    createdAt?: Date;
  
    @Column({ default: null })
    @UpdateDateColumn({
      type: 'timestamp',
      default: () => 'LOCALTIMESTAMP',
    })
    updatedAt?: Date;
  }
  