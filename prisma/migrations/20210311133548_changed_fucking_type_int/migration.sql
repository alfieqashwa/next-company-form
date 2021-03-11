/*
  Warnings:

  - You are about to alter the column `revenue` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `latitude` on the `Office` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - You are about to alter the column `longitude` on the `Office` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "revenue" INTEGER NOT NULL,
    "code" INTEGER NOT NULL,
    "phone" INTEGER NOT NULL
);
INSERT INTO "new_Company" ("id", "name", "address", "revenue", "code", "phone") SELECT "id", "name", "address", "revenue", "code", "phone" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE UNIQUE INDEX "Company.name_unique" ON "Company"("name");
CREATE TABLE "new_Office" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "startDate" TEXT NOT NULL,
    "companyId" TEXT,
    FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Office" ("id", "name", "latitude", "longitude", "startDate", "companyId") SELECT "id", "name", "latitude", "longitude", "startDate", "companyId" FROM "Office";
DROP TABLE "Office";
ALTER TABLE "new_Office" RENAME TO "Office";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
