import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1767777806777 implements MigrationInterface {
    name = 'InitSchema1767777806777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."phone" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "user"."phone" IS 'comment'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL`);
    }

}
