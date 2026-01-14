import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1767780505685 implements MigrationInterface {
    name = 'InitSchema1767780505685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."members_membershipstatus_enum" AS ENUM('ACTIVE', 'EXPIRED', 'CANCELLED')`);
        await queryRunner.query(`CREATE TABLE "members" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userid" uuid NOT NULL, "firstname" character varying(100) NOT NULL, "lastname" character varying(100) NOT NULL, "phone" character varying(20), "avatarurl" character varying(500), "bio" text, "membershipstatus" "public"."members_membershipstatus_enum" NOT NULL DEFAULT 'ACTIVE', "membershipdate" TIMESTAMP NOT NULL DEFAULT now(), "membershipexpiry" TIMESTAMP, "createdat" TIMESTAMP NOT NULL DEFAULT now(), "updatedat" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_609afa1b5c98bd65c21bf43c6de" UNIQUE ("userid"), CONSTRAINT "REL_609afa1b5c98bd65c21bf43c6d" UNIQUE ("userid"), CONSTRAINT "PK_28b53062261b996d9c99fa12404" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_609afa1b5c98bd65c21bf43c6d" ON "members" ("userid") `);
        await queryRunner.query(`CREATE INDEX "IDX_91162a229272ec6b2322e57916" ON "members" ("membershipstatus") `);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_609afa1b5c98bd65c21bf43c6de" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_609afa1b5c98bd65c21bf43c6de"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_91162a229272ec6b2322e57916"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_609afa1b5c98bd65c21bf43c6d"`);
        await queryRunner.query(`DROP TABLE "members"`);
        await queryRunner.query(`DROP TYPE "public"."members_membershipstatus_enum"`);
    }

}
