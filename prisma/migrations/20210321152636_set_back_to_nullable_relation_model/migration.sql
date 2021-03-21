-- RedefineTables
PRAGMA foreign_keys=OFF;
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
