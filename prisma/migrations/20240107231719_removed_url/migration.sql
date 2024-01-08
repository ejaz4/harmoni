/*
  Warnings:

  - You are about to drop the column `url` on the `Song` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Song" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "youtubeId" TEXT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isExplicit" BOOLEAN NOT NULL DEFAULT false,
    "duration" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL,
    "thumbnailUrl" TEXT,
    "artistId" TEXT,
    "albumId" TEXT,
    CONSTRAINT "Song_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Song" ("albumId", "artistId", "createdAt", "duration", "id", "isExplicit", "name", "thumbnailUrl", "updatedAt", "youtubeId") SELECT "albumId", "artistId", "createdAt", "duration", "id", "isExplicit", "name", "thumbnailUrl", "updatedAt", "youtubeId" FROM "Song";
DROP TABLE "Song";
ALTER TABLE "new_Song" RENAME TO "Song";
CREATE UNIQUE INDEX "Song_youtubeId_key" ON "Song"("youtubeId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
