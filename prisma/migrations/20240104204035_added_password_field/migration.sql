/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "profileImageUrl" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "dataProcessing" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("admin", "createdAt", "dataProcessing", "id", "name", "profileImageUrl", "updatedAt", "username") SELECT "admin", "createdAt", "dataProcessing", "id", "name", "profileImageUrl", "updatedAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
