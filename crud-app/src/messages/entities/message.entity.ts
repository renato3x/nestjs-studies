import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  text: string;

  @Column({ nullable: false })
  from: string;

  @Column({ nullable: false })
  to: string;

  @Column({ default: false, nullable: false })
  read: boolean;

  @CreateDateColumn()
  date: Date;
}
