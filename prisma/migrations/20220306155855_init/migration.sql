-- CreateEnum
CREATE TYPE "Status" AS ENUM ('IN_PREPARATION', 'POSTED', 'ON_COURSE', 'DELIVERED');

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deliverymans" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "deliverymans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deliveries" (
    "id" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "id_client" TEXT NOT NULL,
    "id_deliveryman" TEXT NOT NULL,

    CONSTRAINT "deliveries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_username_key" ON "clients"("username");

-- CreateIndex
CREATE UNIQUE INDEX "deliverymans_username_key" ON "deliverymans"("username");

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_id_deliveryman_fkey" FOREIGN KEY ("id_deliveryman") REFERENCES "deliverymans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
