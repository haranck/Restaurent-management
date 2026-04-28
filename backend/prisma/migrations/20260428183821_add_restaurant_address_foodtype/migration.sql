/*
  Warnings:

  - You are about to drop the column `address` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `Restaurant` table. All the data in the column will be lost.
  - Added the required column `foodType` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FoodType" AS ENUM ('VEG', 'NON_VEG', 'BOTH');

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "address",
DROP COLUMN "contact",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "foodType" "FoodType" NOT NULL,
ADD COLUMN     "nearestPlace" TEXT,
ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "locality" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "restaurantId" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_restaurantId_key" ON "Address"("restaurantId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
