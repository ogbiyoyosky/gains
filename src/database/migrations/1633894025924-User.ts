import {MigrationInterface, QueryRunner} from "typeorm";

export class User1633894025924 implements MigrationInterface {
    name = 'User1633894025924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userName" character varying NOT NULL, "password" character varying NOT NULL, "isVerified" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59" UNIQUE ("userName"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "isVerified" TO "verifiedCount"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "verifiedCount"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "verifiedCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "verifiedCount"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "verifiedCount" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "verifiedCount" TO "isVerified"`);
    }

}
