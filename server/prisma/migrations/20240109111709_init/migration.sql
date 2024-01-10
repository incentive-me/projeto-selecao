-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ReposStars" (
    "id" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "repo_id" TEXT NOT NULL,
    CONSTRAINT "Tag_repo_id_fkey" FOREIGN KEY ("repo_id") REFERENCES "ReposStars" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "ReposStars_id_key" ON "ReposStars"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_id_key" ON "Tag"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
