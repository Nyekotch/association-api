import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

export enum UserRole {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  MEMBER = "MEMBER",
  GUEST = "GUEST",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  phone: string | null;

  @Column({ type: "varchar", length: 500, nullable: true })
  avatarurl: string | null;

  @Column({ type: "text", nullable: true })
  bio: string | null;

  @Index()
  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @Index()
  @Column({
    type: "varchar",
    length: 20,
    enum: UserRole,
    default: UserRole.MEMBER,
  })
  role: UserRole;

  @Index()
  @Column({ type: "boolean", default: true })
  isactive: boolean;

  @Column({ type: "timestamp", nullable: true })
  lastlogin: Date | null;

  @CreateDateColumn({ type: "timestamp" })
  createdat: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedat: Date;
}
