-- CreateTable
CREATE TABLE "categoria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "categoria_name_key" ON "categoria"("name");
