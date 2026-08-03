import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1785762299195 implements MigrationInterface {
  name = 'InitialSchema1785762299195';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."orders_courierpartner_enum" AS ENUM('URBANEBOLT', 'MOCK')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."orders_status_enum" AS ENUM('PENDING', 'QUEUED', 'PROCESSING', 'CREATED', 'PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED', 'FAILED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "internalOrderId" character varying(100) NOT NULL, "courierPartner" "public"."orders_courierpartner_enum" NOT NULL, "courierShipmentId" character varying(100), "awbNumber" character varying(100), "courierTrackingNumber" character varying(100), "courierStatus" character varying(50), "status" "public"."orders_status_enum" NOT NULL DEFAULT 'PENDING', "idempotencyKey" character varying, "requestPayload" jsonb, "responsePayload" jsonb, CONSTRAINT "UQ_1881ab845832ad82c4e45f5fe3b" UNIQUE ("idempotencyKey"), CONSTRAINT "UQ_a14fdf152ce4dd27ac1d029ab1c" UNIQUE ("internalOrderId", "courierPartner"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b8fa439d0be6ec87d9820af83e" ON "orders" ("courierTrackingNumber") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c9b95b5d139280f39a9176f0ec" ON "orders" ("courierPartner") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_775c9f06fc27ae3ff8fb26f2c4" ON "orders" ("status") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."audit_logs_action_enum" AS ENUM('ORDER_CREATED', 'ORDER_CANCELLED', 'TRACKING_SYNC', 'TOKEN_REFRESH', 'RETRY', 'QUEUE_PROCESSED')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."audit_logs_courier_enum" AS ENUM('URBANEBOLT', 'MOCK')`,
    );
    await queryRunner.query(
      `CREATE TABLE "audit_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "requestId" character varying NOT NULL, "action" "public"."audit_logs_action_enum" NOT NULL, "courier" "public"."audit_logs_courier_enum" NOT NULL, "status" character varying NOT NULL, "durationMs" integer, "requestPayload" jsonb, "responsePayload" jsonb, "errorPayload" jsonb, "order_id" uuid, CONSTRAINT "PK_1bb179d048bbc581caa3b013439" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cee5459245f652b75eb2759b4c" ON "audit_logs" ("action") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a3efbfd507134492f264a19b9c" ON "audit_logs" ("requestId") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."courier_tokens_courier_enum" AS ENUM('URBANEBOLT', 'MOCK')`,
    );
    await queryRunner.query(
      `CREATE TABLE "courier_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "courier" "public"."courier_tokens_courier_enum" NOT NULL, "accessToken" text NOT NULL, "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "UQ_9abfd95a61d7f76fab9480bd703" UNIQUE ("courier"), CONSTRAINT "PK_d3c72cc99696a7973ad9da4a1ef" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."batch_items_processingstatus_enum" AS ENUM('PENDING', 'SUCCESS', 'FAILED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "batch_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "processingStatus" "public"."batch_items_processingstatus_enum" NOT NULL DEFAULT 'PENDING', "errorMessage" text, "batch_id" uuid, "order_id" uuid, CONSTRAINT "UQ_a63f77436165cff2bd78dbdec7e" UNIQUE ("batch_id", "order_id"), CONSTRAINT "PK_02ce8e2f2a9b56712677455e28b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."batches_status_enum" AS ENUM('PENDING', 'PROCESSING', 'PARTIAL_SUCCESS', 'COMPLETED', 'FAILED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "batches" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "batchNumber" character varying(100) NOT NULL, "status" "public"."batches_status_enum" NOT NULL DEFAULT 'PENDING', "totalOrders" integer NOT NULL, "processedOrders" integer NOT NULL DEFAULT '0', "successCount" integer NOT NULL DEFAULT '0', "failureCount" integer NOT NULL DEFAULT '0', "completedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_54653a69252ad13977e8e834fc5" UNIQUE ("batchNumber"), CONSTRAINT "PK_55e7ff646e969b61d37eea5be7a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0e0a2fc0b05d1980725ce39725" ON "batches" ("status") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."tracking_history_status_enum" AS ENUM('PENDING', 'QUEUED', 'PROCESSING', 'CREATED', 'PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED', 'FAILED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "tracking_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "status" "public"."tracking_history_status_enum" NOT NULL, "location" character varying(255), "remarks" text, "courierTimestamp" TIMESTAMP WITH TIME ZONE, "rawPayload" jsonb, "order_id" uuid NOT NULL, CONSTRAINT "PK_5e58aa7bd8c7a6342010afd445a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ad8d9f8806478557d71b8886cd" ON "tracking_history" ("status") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cdf979f51f6720c6e85a4998ce" ON "tracking_history" ("order_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "audit_logs" ADD CONSTRAINT "FK_c38be52b1a471cd556e1bcda243" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "batch_items" ADD CONSTRAINT "FK_4052dad1531c1027609d0f1f06c" FOREIGN KEY ("batch_id") REFERENCES "batches"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "batch_items" ADD CONSTRAINT "FK_d19ba1d9a395df3557caff56dc5" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracking_history" ADD CONSTRAINT "FK_cdf979f51f6720c6e85a4998ce7" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tracking_history" DROP CONSTRAINT "FK_cdf979f51f6720c6e85a4998ce7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "batch_items" DROP CONSTRAINT "FK_d19ba1d9a395df3557caff56dc5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "batch_items" DROP CONSTRAINT "FK_4052dad1531c1027609d0f1f06c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "audit_logs" DROP CONSTRAINT "FK_c38be52b1a471cd556e1bcda243"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cdf979f51f6720c6e85a4998ce"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ad8d9f8806478557d71b8886cd"`,
    );
    await queryRunner.query(`DROP TABLE "tracking_history"`);
    await queryRunner.query(
      `DROP TYPE "public"."tracking_history_status_enum"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0e0a2fc0b05d1980725ce39725"`,
    );
    await queryRunner.query(`DROP TABLE "batches"`);
    await queryRunner.query(`DROP TYPE "public"."batches_status_enum"`);
    await queryRunner.query(`DROP TABLE "batch_items"`);
    await queryRunner.query(
      `DROP TYPE "public"."batch_items_processingstatus_enum"`,
    );
    await queryRunner.query(`DROP TABLE "courier_tokens"`);
    await queryRunner.query(`DROP TYPE "public"."courier_tokens_courier_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a3efbfd507134492f264a19b9c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cee5459245f652b75eb2759b4c"`,
    );
    await queryRunner.query(`DROP TABLE "audit_logs"`);
    await queryRunner.query(`DROP TYPE "public"."audit_logs_courier_enum"`);
    await queryRunner.query(`DROP TYPE "public"."audit_logs_action_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_775c9f06fc27ae3ff8fb26f2c4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c9b95b5d139280f39a9176f0ec"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b8fa439d0be6ec87d9820af83e"`,
    );
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."orders_courierpartner_enum"`);
  }
}
