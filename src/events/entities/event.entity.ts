import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity("events")
export class Event {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string | null;

  @Index() // idx_events_startdate
  @Column({ type: "timestamp" })
  startdate: Date;

  @Column({ type: "timestamp" })
  enddate: Date;

  @Column({ type: "varchar", length: 500, nullable: true })
  location: string | null;

  @Column({ type: "integer", nullable: true })
  capacity: number | null;

  @Column({ type: "varchar", length: 500, nullable: true })
  imageurl: string | null;

  @Index() // idx_events_organizerid
  @Column({ type: "uuid" })
  organizerid: string;

  // Relation ManyToOne avec User (organizer)
  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "organizerid" })
  organizer: User;

  @Index() // idx_events_ispublished
  @Column({ type: "boolean", default: true })
  ispublished: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createdat: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedat: Date;
}
