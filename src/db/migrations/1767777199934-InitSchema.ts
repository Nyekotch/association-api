import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1767777199934 implements MigrationInterface {
    name = 'InitSchema1767777199934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
    }

}
