import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1782054936685 implements MigrationInterface {
    name = 'InitialSchema1782054936685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "sentAt" TIMESTAMP NOT NULL DEFAULT now(), "senderId" uuid, "groupId" uuid, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat_groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_99f0cb8163569cd32e8a16cbc9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat_groups_members_users" ("chatGroupsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_92d2b94c6fd5c608adbed3861bf" PRIMARY KEY ("chatGroupsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5821bd06d5f524f12dd7d36cb5" ON "chat_groups_members_users" ("chatGroupsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_76c5c63098bd2b068f33590f81" ON "chat_groups_members_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_438f09ab5b4bbcd27683eac2a5e" FOREIGN KEY ("groupId") REFERENCES "chat_groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_groups_members_users" ADD CONSTRAINT "FK_5821bd06d5f524f12dd7d36cb58" FOREIGN KEY ("chatGroupsId") REFERENCES "chat_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "chat_groups_members_users" ADD CONSTRAINT "FK_76c5c63098bd2b068f33590f815" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_groups_members_users" DROP CONSTRAINT "FK_76c5c63098bd2b068f33590f815"`);
        await queryRunner.query(`ALTER TABLE "chat_groups_members_users" DROP CONSTRAINT "FK_5821bd06d5f524f12dd7d36cb58"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_438f09ab5b4bbcd27683eac2a5e"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_76c5c63098bd2b068f33590f81"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5821bd06d5f524f12dd7d36cb5"`);
        await queryRunner.query(`DROP TABLE "chat_groups_members_users"`);
        await queryRunner.query(`DROP TABLE "chat_groups"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "messages"`);
    }

}
