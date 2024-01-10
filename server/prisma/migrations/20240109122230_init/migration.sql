/*
  Warnings:

  - Added the required column `githubRepoId` to the `ReposStars` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReposStars" (
    "id" TEXT NOT NULL,
    "githubRepoId" INTEGER NOT NULL,
    "full_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author_url" TEXT NOT NULL,
    "count_stars" INTEGER NOT NULL,
    "count_forks" INTEGER NOT NULL,
    "linguage" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "updated_at" TEXT NOT NULL,
    "repo_user_id" TEXT NOT NULL,
    CONSTRAINT "ReposStars_repo_user_id_fkey" FOREIGN KEY ("repo_user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ReposStars" ("author_url", "count_forks", "count_stars", "description", "full_name", "id", "linguage", "repo_user_id", "updated_at", "url") SELECT "author_url", "count_forks", "count_stars", "description", "full_name", "id", "linguage", "repo_user_id", "updated_at", "url" FROM "ReposStars";
DROP TABLE "ReposStars";
ALTER TABLE "new_ReposStars" RENAME TO "ReposStars";
CREATE UNIQUE INDEX "ReposStars_id_key" ON "ReposStars"("id");
CREATE UNIQUE INDEX "ReposStars_githubRepoId_key" ON "ReposStars"("githubRepoId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
