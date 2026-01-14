import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { ForumPost } from "../../forum_posts/entities/forum_post.entity";

@Entity("forumtopics")
export class ForumTopic {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string | null;

  @Index() // idx_forumtopics_creatorid
  @Column({ type: "uuid" })
  creatorid: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "creatorid" })
  creator: User;

  @OneToMany(() => ForumPost, post => post.topic)
  posts: ForumPost[];

  @Index() // idx_forumtopics_ispinned
  @Column({ type: "boolean", default: false })
  ispinned: boolean;

  @Index() // idx_forumtopics_isclosed
  @Column({ type: "boolean", default: false })
  isclosed: boolean;

  @Column({ type: "integer", default: 0 })
  viewcount: number;

  @CreateDateColumn({ type: "timestamp" })
  createdat: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedat: Date;
}
