/*
  Warnings:

  - You are about to drop the column `likes` on the `Snippet` table. All the data in the column will be lost.
  - You are about to drop the `SnippetLike` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SnippetLike" DROP CONSTRAINT "SnippetLike_snippetId_fkey";

-- DropForeignKey
ALTER TABLE "SnippetLike" DROP CONSTRAINT "SnippetLike_userId_fkey";

-- AlterTable
ALTER TABLE "Snippet" DROP COLUMN "likes";

-- DropTable
DROP TABLE "SnippetLike";
