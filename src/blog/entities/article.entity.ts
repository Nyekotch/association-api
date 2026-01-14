import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity("articles")
export class Article {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  title: string;

  @Index() // idx_articles_slug
  @Column({ type: "varchar", length: 255, unique: true })
  slug: string;

  @Column({ type: "text" })
  content: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  excerpt: string | null;

  @Column({ type: "varchar", length: 500, nullable: true })
  featuredimage: string | null;

  // authorid nullable car ON DELETE SET NULL
  @Index() // idx_articles_authorid
  @Column({ type: "uuid", nullable: true })
  authorid: string | null;

  @ManyToOne(() => User, { onDelete: "SET NULL", nullable: true })
  @JoinColumn({ name: "authorid" })
  author: User | null;

  @Column({ type: "varchar", length: 50, nullable: true })
  category: string | null;

  @Index() // idx_articles_ispublished
  @Column({ type: "boolean", default: false })
  ispublished: boolean;

  @Column({ type: "integer", default: 0 })
  viewcount: number;

  @CreateDateColumn({ type: "timestamp" })
  createdat: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedat: Date;

  @Column({ type: "timestamp", nullable: true })
  publishedat: Date | null;
}
