import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1767775497003 implements MigrationInterface {
    name = 'InitSchema1767775497003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    }

}
