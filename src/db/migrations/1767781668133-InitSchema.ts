import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1767781668133 implements MigrationInterface {
    name = 'InitSchema1767781668133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "forumtopics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "description" text, "creatorid" uuid NOT NULL, "ispinned" boolean NOT NULL DEFAULT false, "isclosed" boolean NOT NULL DEFAULT false, "viewcount" integer NOT NULL DEFAULT '0', "createdat" TIMESTAMP NOT NULL DEFAULT now(), "updatedat" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fcc530fe563d7e971ff0826c8c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_007a7d983019e8197a03299be0" ON "forumtopics" ("creatorid") `);
        await queryRunner.query(`CREATE INDEX "IDX_e9498f4d5aeb02d8f754b8a303" ON "forumtopics" ("ispinned") `);
        await queryRunner.query(`CREATE INDEX "IDX_b0fc4f897b96acbe33cfc42c98" ON "forumtopics" ("isclosed") `);
        await queryRunner.query(`CREATE TABLE "events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "description" text, "startdate" TIMESTAMP NOT NULL, "enddate" TIMESTAMP NOT NULL, "location" character varying(500), "capacity" integer, "imageurl" character varying(500), "organizerid" uuid NOT NULL, "ispublished" boolean NOT NULL DEFAULT true, "createdat" TIMESTAMP NOT NULL DEFAULT now(), "updatedat" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_85b7584956761f9679c2ca9266" ON "events" ("startdate") `);
        await queryRunner.query(`CREATE INDEX "IDX_7dc2f124e300a6d7d307e8fa7e" ON "events" ("organizerid") `);
        await queryRunner.query(`CREATE INDEX "IDX_76fef7f27f55145e10dfaf1be0" ON "events" ("ispublished") `);
        await queryRunner.query(`CREATE TYPE "public"."eventregistrations_status_enum" AS ENUM('REGISTERED', 'ATTENDED', 'CANCELLED')`);
        await queryRunner.query(`CREATE TABLE "eventregistrations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "eventid" uuid NOT NULL, "memberid" uuid NOT NULL, "registeredat" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."eventregistrations_status_enum" NOT NULL DEFAULT 'REGISTERED', CONSTRAINT "UQ_9ea6341cd10726ac86c332e8a95" UNIQUE ("eventid", "memberid"), CONSTRAINT "PK_d719d0c9702ce5bf780b2624ba5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2d9b06834197378c71fda81166" ON "eventregistrations" ("eventid") `);
        await queryRunner.query(`CREATE INDEX "IDX_915eba89f65c431b5d66454e8c" ON "eventregistrations" ("memberid") `);
        await queryRunner.query(`CREATE INDEX "IDX_509b55c43253620bed8ac5f875" ON "eventregistrations" ("status") `);
        await queryRunner.query(`ALTER TABLE "forumtopics" ADD CONSTRAINT "FK_007a7d983019e8197a03299be07" FOREIGN KEY ("creatorid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_7dc2f124e300a6d7d307e8fa7ee" FOREIGN KEY ("organizerid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "eventregistrations" ADD CONSTRAINT "FK_2d9b06834197378c71fda81166d" FOREIGN KEY ("eventid") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "eventregistrations" ADD CONSTRAINT "FK_915eba89f65c431b5d66454e8ca" FOREIGN KEY ("memberid") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "eventregistrations" DROP CONSTRAINT "FK_915eba89f65c431b5d66454e8ca"`);
        await queryRunner.query(`ALTER TABLE "eventregistrations" DROP CONSTRAINT "FK_2d9b06834197378c71fda81166d"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_7dc2f124e300a6d7d307e8fa7ee"`);
        await queryRunner.query(`ALTER TABLE "forumtopics" DROP CONSTRAINT "FK_007a7d983019e8197a03299be07"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_509b55c43253620bed8ac5f875"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_915eba89f65c431b5d66454e8c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2d9b06834197378c71fda81166"`);
        await queryRunner.query(`DROP TABLE "eventregistrations"`);
        await queryRunner.query(`DROP TYPE "public"."eventregistrations_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_76fef7f27f55145e10dfaf1be0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7dc2f124e300a6d7d307e8fa7e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_85b7584956761f9679c2ca9266"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b0fc4f897b96acbe33cfc42c98"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e9498f4d5aeb02d8f754b8a303"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_007a7d983019e8197a03299be0"`);
        await queryRunner.query(`DROP TABLE "forumtopics"`);
    }

}
