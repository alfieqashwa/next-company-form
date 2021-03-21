/*
  Warnings:

  - Made the column `companyId` on table `Office` required. The migration will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Company.name_unique";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Office" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "startDate" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Office" ("id", "name", "latitude", "longitude", "startDate", "companyId") SELECT "id", "name", "latitude", "longitude", "startDate", "companyId" FROM "Office";
DROP TABLE "Office";
ALTER TABLE "new_Office" RENAME TO "Office";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
