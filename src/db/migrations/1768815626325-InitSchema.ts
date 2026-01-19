import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1768815626325 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Créer la table users
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "email" character varying NOT NULL,
                "phone" character varying(20) NOT NULL,
                "role" character varying NOT NULL DEFAULT 'user',
                "isactive" boolean NOT NULL DEFAULT true,
                "avatarurl" character varying(500),
                "bio" text,
                "createdat" timestamp NOT NULL DEFAULT now(),
                "updatedat" timestamp NOT NULL DEFAULT now(),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);

        // Créer la table events
        await queryRunner.query(`
            CREATE TABLE "events" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "description" text,
                "date" timestamp NOT NULL,
                "location" character varying,
                "capacity" integer,
                "imageurl" character varying(500),
                "organizerid" uuid,
                "createdat" timestamp NOT NULL DEFAULT now(),
                "updatedat" timestamp NOT NULL DEFAULT now(),
                CONSTRAINT "PK_3c2bc3f420a4324c3f070f4b8e2" PRIMARY KEY ("id")
            )
        `);

        // Créer la table eventregistrations
        await queryRunner.query(`
            CREATE TABLE "eventregistrations" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "memberid" uuid NOT NULL,
                "eventid" uuid NOT NULL,
                "registrationdate" timestamp NOT NULL DEFAULT now(),
                CONSTRAINT "PK_915eba89f65c431b5d66454e8ca" PRIMARY KEY ("id"),
                CONSTRAINT "FK_eventregistrations_memberid_users" FOREIGN KEY ("memberid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
                CONSTRAINT "FK_eventregistrations_eventid_events" FOREIGN KEY ("eventid") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION
            )
        `);

        // Créer la table articles
        await queryRunner.query(`
            CREATE TABLE "articles" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "content" text NOT NULL,
                "excerpt" text,
                "featuredimage" character varying(500),
                "authorid" uuid,
                "createdat" timestamp NOT NULL DEFAULT now(),
                "updatedat" timestamp NOT NULL DEFAULT now(),
                CONSTRAINT "PK_d99c3bf6603dba4495f5ee3e377" PRIMARY KEY ("id")
            )
        `);

        // Créer la table forumtopics
        await queryRunner.query(`
            CREATE TABLE "forumtopics" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "content" text NOT NULL,
                "authorid" uuid NOT NULL,
                "createdat" timestamp NOT NULL DEFAULT now(),
                "updatedat" timestamp NOT NULL DEFAULT now(),
                CONSTRAINT "PK_8d2f5c3a5c3b9f5e4d7a6c3b9f5e" PRIMARY KEY ("id")
            )
        `);

        // Créer la table forumposts
        await queryRunner.query(`
            CREATE TABLE "forumposts" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "content" text NOT NULL,
                "topicid" uuid NOT NULL,
                "authorid" uuid NOT NULL,
                "createdat" timestamp NOT NULL DEFAULT now(),
                "updatedat" timestamp NOT NULL DEFAULT now(),
                CONSTRAINT "PK_f3c2b5a6c3b9f5e4d7a6c3b9f5e4d" PRIMARY KEY ("id")
            )
        `);

        // Créer les index
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email")`);
        await queryRunner.query(`CREATE INDEX "IDX_ace513fa30d485cfd25c11a9e4" ON "users" ("role")`);
        await queryRunner.query(`CREATE INDEX "IDX_86489f9935786d1b8a370c918d" ON "users" ("isactive")`);
        await queryRunner.query(`CREATE INDEX "IDX_events_organizerid" ON "events" ("organizerid")`);
        await queryRunner.query(`CREATE INDEX "IDX_articles_authorid" ON "articles" ("authorid")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "forumposts"`);
        await queryRunner.query(`DROP TABLE "forumtopics"`);
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`DROP TABLE "eventregistrations"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
