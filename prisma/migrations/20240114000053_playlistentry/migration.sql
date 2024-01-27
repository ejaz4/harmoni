/*
  Warnings:

  - You are about to drop the column `test` on the `User` table. All the data in the column will be lost.

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
    "dataProcessing" BOOLEAN NOT NULL DEFAULT false,
    "queuePosition" INTEGER NOT NULL DEFAULT 0,
    "queueID" TEXT,
    "likedPlaylistID" TEXT,
    "recentlyPlayedPlaylistID" TEXT
);
INSERT INTO "new_User" ("admin", "createdAt", "dataProcessing", "id", "likedPlaylistID", "name", "password", "profileImageUrl", "queueID", "queuePosition", "recentlyPlayedPlaylistID", "updatedAt", "username") SELECT "admin", "createdAt", "dataProcessing", "id", "likedPlaylistID", "name", "password", "profileImageUrl", "queueID", "queuePosition", "recentlyPlayedPlaylistID", "updatedAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
