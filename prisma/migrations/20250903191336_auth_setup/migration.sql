/*
  Warnings:

  - You are about to drop the column `contrasena` on the `usuario` table. All the data in the column will be lost.
  - Added the required column `password` to the `USUARIO` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `contrasena`,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;
