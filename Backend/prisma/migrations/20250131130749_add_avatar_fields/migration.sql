/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- Supprimer d'abord la contrainte de clé étrangère
ALTER TABLE "Snippet" DROP CONSTRAINT "Snippet_userId_fkey";

-- Supprimer l'index providerId
DROP INDEX IF EXISTS "User_providerId_key";

-- Modifier la table User
ALTER TABLE "User" 
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "githubAvatar" TEXT,
ADD COLUMN     "googleAvatar" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Mise à jour des timestamps pour les utilisateurs existants
UPDATE "User" 
SET "updatedAt" = CURRENT_TIMESTAMP, 
    "createdAt" = CURRENT_TIMESTAMP 
WHERE "updatedAt" IS NULL OR "createdAt" IS NULL;

-- Recréer la contrainte de clé étrangère
ALTER TABLE "Snippet" 
ADD CONSTRAINT "Snippet_userId_fkey" 
FOREIGN KEY ("userId") 
REFERENCES "User"("id") 
ON DELETE RESTRICT 
ON UPDATE CASCADE;
