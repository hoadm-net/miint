-- CreateTable
CREATE TABLE "Url" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "original" TEXT NOT NULL,
    "password" TEXT,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_slug_key" ON "Url"("slug");

-- CreateIndex
CREATE INDEX "Url_expiresAt_idx" ON "Url"("expiresAt");
