-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "userId" TEXT,
    "isAdmin" BOOLEAN DEFAULT false,
    "visitCount" INTEGER DEFAULT 0,
    "userIP" TEXT,
    "userNames" TEXT[],
    "countryName" TEXT,
    "region" TEXT,
    "city" TEXT,
    "postal" TEXT,
    "latitude" TEXT,
    "longitude" TEXT,
    "timezone" TEXT,
    "org" TEXT,
    "joinUTCDate" TIMESTAMP(3),
    "userVisits" TIMESTAMP(3)[],
    "countryCode" TEXT,
    "regionCode" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Error" (
    "id" SERIAL NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "userIP" TEXT,
    "userId" TEXT,
    "name" TEXT,
    "message" TEXT,
    "stack" TEXT,

    CONSTRAINT "Error_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_userId_key" ON "Users"("userId");
