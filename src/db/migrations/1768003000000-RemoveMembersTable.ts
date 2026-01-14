import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveMembersTable1768003000000 implements MigrationInterface {
    name = 'RemoveMembersTable1768003000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD COLUMN "phone" character varying(20)`);
        await queryRunner.query(`ALTER TABLE "users" ADD COLUMN "avatarurl" character varying(500)`);
        await queryRunner.query(`ALTER TABLE "users" ADD COLUMN "bio" text`);

        await queryRunner.query(`UPDATE "users" u SET "phone" = m."phone", "avatarurl" = m."avatarurl", "bio" = m."bio" FROM "members" m WHERE m."userid" = u."id"`);

        await queryRunner.query(`ALTER TABLE "eventregistrations" DROP CONSTRAINT "FK_915eba89f65c431b5d66454e8ca"`);
        await queryRunner.query(`UPDATE "eventregistrations" er SET "memberid" = m."userid" FROM "members" m WHERE er."memberid" = m."id"`);
        await queryRunner.query(`ALTER TABLE "eventregistrations" ADD CONSTRAINT "FK_eventregistrations_memberid_users" FOREIGN KEY ("memberid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);

        await queryRunner.query(`DROP TABLE "members"`);
        await queryRunner.query(`DROP TYPE "public"."members_membershipstatus_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "eventregistrations" DROP CONSTRAINT "FK_eventregistrations_memberid_users"`);
        
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bio"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatarurl"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }
}
