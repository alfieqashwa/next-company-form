/*
  Warnings:

  - You are about to drop the `Office` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys
=off;
DROP TABLE "Office";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "offices"
(
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "latitude" REAL NOT NULL,
  "longitude" REAL NOT NULL,
  "start_date" TEXT NOT NULL,
  "company_id" TEXT,
  FOREIGN KEY ("company_id") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
