import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventsModule } from './events/events.module';
import { EventRegistrationsModule } from './event_registrations/event_registrations.module';
import { ForumTopicsModule } from './forum_topics/forum_topics.module';
import { ForumPostsModule } from './forum_posts/forum_posts.module';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import * as dotenv from 'dotenv';

dotenv.config();


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',

      // Render utilise DATABASE_URL
      url: process.env.DATABASE_URL,

      // Local utilise les variables séparées
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,

      autoLoadEntities: true,
      synchronize: true,

      ssl: process.env.DATABASE_URL
        ? { rejectUnauthorized: false }
        : false,
    }),
    UsersModule,
    EventsModule,
    EventRegistrationsModule,
    ForumTopicsModule,
    ForumPostsModule,
    BlogModule,
    AuthModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
