-- CreateTable
CREATE TABLE "byte" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" BLOB NOT NULL
);

-- CreateTable
CREATE TABLE "tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tag_on_byte" (
    "tag_id" INTEGER NOT NULL,
    "byte_id" TEXT NOT NULL,

    PRIMARY KEY ("tag_id", "byte_id"),
    CONSTRAINT "tag_on_byte_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tag_on_byte_byte_id_fkey" FOREIGN KEY ("byte_id") REFERENCES "byte" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "byte_slug_key" ON "byte"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "tag_name_key" ON "tag"("name");
