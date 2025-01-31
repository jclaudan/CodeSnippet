/*
  Warnings:

  - Made the column `description` on table `Snippet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Snippet" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "description" SET NOT NULL;
