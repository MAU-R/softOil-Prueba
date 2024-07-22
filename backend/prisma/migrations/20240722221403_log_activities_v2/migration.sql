/*
  Warnings:

  - You are about to drop the `ActivityLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ActivityLog";

-- CreateTable
CREATE TABLE "activity_log" (
    "id" SERIAL NOT NULL,
    "activity" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_log_pkey" PRIMARY KEY ("id")
);
