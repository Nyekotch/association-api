import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  Unique,
} from "typeorm";
import { Event } from "../../events/entities/event.entity";
import { User } from "../../users/entities/user.entity";

export enum RegistrationStatus {
  REGISTERED = "REGISTERED",
  ATTENDED = "ATTENDED",
  CANCELLED = "CANCELLED",
}

@Entity("eventregistrations")
@Unique(["eventid", "memberid"]) // Empêche un même membre de s'inscrire 2x au même événement
export class EventRegistration {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index() // idx_eventregistrations_eventid
  @Column({ type: "uuid" })
  eventid: string;

  // Relation ManyToOne avec Event
  @ManyToOne(() => Event, { onDelete: "CASCADE" })
  @JoinColumn({ name: "eventid" })
  event: Event;

  @Index() // idx_eventregistrations_memberid
  @Column({ type: "uuid" })
  memberid: string;

  // Relation ManyToOne avec User (membre)
  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "memberid" })
  member: User;

  @CreateDateColumn({ type: "timestamp" })
  registeredat: Date;

  @Index() // idx_eventregistrations_status
  @Column({
    type: "enum",
    enum: RegistrationStatus,
    default: RegistrationStatus.REGISTERED,
  })
  status: RegistrationStatus;
}
