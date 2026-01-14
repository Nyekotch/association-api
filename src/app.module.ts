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


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: Number(config.get('DB_PORT')),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false,
      }),
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
