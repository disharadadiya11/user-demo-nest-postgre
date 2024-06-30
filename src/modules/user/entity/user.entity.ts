import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  mobile: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @OneToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @OneToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  updated_by?: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
}
