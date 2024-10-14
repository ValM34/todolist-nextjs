-- CreateEnum
CREATE TYPE "Emergency" AS ENUM ('HIGHT', 'AVERAGE', 'LOW');

-- CreateEnum
CREATE TYPE "Importance" AS ENUM ('HIGHT', 'AVERAGE', 'LOW');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "emergency" "Emergency" NOT NULL DEFAULT 'AVERAGE',
ADD COLUMN     "importance" "Importance" NOT NULL DEFAULT 'AVERAGE';
