/*
  Warnings:

  - You are about to drop the column `value` on the `Balance` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Balance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "initialValue" REAL NOT NULL,
    "total" REAL NOT NULL,
    "usedValue" REAL NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Balance" ("description", "id", "initialValue", "name", "total", "usedValue", "userId") SELECT "description", "id", "initialValue", "name", "total", "usedValue", "userId" FROM "Balance";
DROP TABLE "Balance";
ALTER TABLE "new_Balance" RENAME TO "Balance";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
