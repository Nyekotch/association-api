import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1768061284696 implements MigrationInterface {
    name = 'InitSchema1768061284696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "eventregistrations" DROP CONSTRAINT "FK_eventregistrations_memberid_users"`);
        await queryRunner.query(`ALTER TABLE "eventregistrations" ADD CONSTRAINT "FK_915eba89f65c431b5d66454e8ca" FOREIGN KEY ("memberid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "eventregistrations" DROP CONSTRAINT "FK_915eba89f65c431b5d66454e8ca"`);
        await queryRunner.query(`ALTER TABLE "eventregistrations" ADD CONSTRAINT "FK_eventregistrations_memberid_users" FOREIGN KEY ("memberid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
