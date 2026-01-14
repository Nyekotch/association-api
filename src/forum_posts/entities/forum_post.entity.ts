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
import { ForumTopic } from "../../forum_topics/entities/forum_topic.entity";
import { User } from "../../users/entities/user.entity";

@Entity("forumposts")
export class ForumPost {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index() // idx_forumposts_topicid
  @Column({ type: "uuid" })
  topicid: string;

  @ManyToOne(() => ForumTopic, { onDelete: "CASCADE" })
  @JoinColumn({ name: "topicid" })
  topic: ForumTopic;

  @Index() // idx_forumposts_authorid
  @Column({ type: "uuid" })
  authorid: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "authorid" })
  author: User;

  @Column({ type: "text" })
  content: string;

  @Index() // idx_forumposts_likescount (optionnel mais présent dans ton SQL)
  @Column({ type: "integer", default: 0 })
  likescount: number;

  @CreateDateColumn({ type: "timestamp" })
  createdat: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedat: Date;
}
