import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1767782033358 implements MigrationInterface {
    name = 'InitSchema1767782033358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "forumposts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "topicid" uuid NOT NULL, "authorid" uuid NOT NULL, "content" text NOT NULL, "likescount" integer NOT NULL DEFAULT '0', "createdat" TIMESTAMP NOT NULL DEFAULT now(), "updatedat" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6febe2827ab4c92223f9a3eabab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c8f09c5f34f9cb55db423d8ef9" ON "forumposts" ("topicid") `);
        await queryRunner.query(`CREATE INDEX "IDX_4ba3708b24fc1ef96ca420dcba" ON "forumposts" ("authorid") `);
        await queryRunner.query(`CREATE INDEX "IDX_f4dd6c4a7c4485daa9abff9c30" ON "forumposts" ("likescount") `);
        await queryRunner.query(`CREATE TABLE "articles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "slug" character varying(255) NOT NULL, "content" text NOT NULL, "excerpt" character varying(500), "featuredimage" character varying(500), "authorid" uuid, "category" character varying(50), "ispublished" boolean NOT NULL DEFAULT false, "viewcount" integer NOT NULL DEFAULT '0', "createdat" TIMESTAMP NOT NULL DEFAULT now(), "updatedat" TIMESTAMP NOT NULL DEFAULT now(), "publishedat" TIMESTAMP, CONSTRAINT "UQ_1123ff6815c5b8fec0ba9fec370" UNIQUE ("slug"), CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1123ff6815c5b8fec0ba9fec37" ON "articles" ("slug") `);
        await queryRunner.query(`CREATE INDEX "IDX_878cea86a3ca18f5448ce8f84a" ON "articles" ("authorid") `);
        await queryRunner.query(`CREATE INDEX "IDX_0640aaaa9bd9f83fc091849ddb" ON "articles" ("ispublished") `);
        await queryRunner.query(`ALTER TABLE "forumposts" ADD CONSTRAINT "FK_c8f09c5f34f9cb55db423d8ef97" FOREIGN KEY ("topicid") REFERENCES "forumtopics"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "forumposts" ADD CONSTRAINT "FK_4ba3708b24fc1ef96ca420dcbaa" FOREIGN KEY ("authorid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_878cea86a3ca18f5448ce8f84a6" FOREIGN KEY ("authorid") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_878cea86a3ca18f5448ce8f84a6"`);
        await queryRunner.query(`ALTER TABLE "forumposts" DROP CONSTRAINT "FK_4ba3708b24fc1ef96ca420dcbaa"`);
        await queryRunner.query(`ALTER TABLE "forumposts" DROP CONSTRAINT "FK_c8f09c5f34f9cb55db423d8ef97"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0640aaaa9bd9f83fc091849ddb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_878cea86a3ca18f5448ce8f84a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1123ff6815c5b8fec0ba9fec37"`);
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f4dd6c4a7c4485daa9abff9c30"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4ba3708b24fc1ef96ca420dcba"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c8f09c5f34f9cb55db423d8ef9"`);
        await queryRunner.query(`DROP TABLE "forumposts"`);
    }

}
