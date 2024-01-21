/*
  Warnings:

  - Added the required column `total` to the `Balance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usedValue` to the `Balance` table without a default value. This is not possible if the table is not empty.

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
    "value" REAL NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Balance" ("description", "id", "initialValue", "name", "userId", "value") SELECT "description", "id", "initialValue", "name", "userId", "value" FROM "Balance";
DROP TABLE "Balance";
ALTER TABLE "new_Balance" RENAME TO "Balance";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
