-- CreateTable
CREATE TABLE `USUARIO` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `ELO` INTEGER NULL,
    `isGuest` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `USUARIO_email_key`(`email`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TORNEOS` (
    `id_torneo` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `fecha_inicio` DATETIME(3) NOT NULL,
    `reglas` VARCHAR(191) NULL,
    `premios` VARCHAR(191) NULL,
    `tipo_torneo` VARCHAR(191) NULL,
    `creador_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_torneo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PARTIDA` (
    `id_partida` INTEGER NOT NULL AUTO_INCREMENT,
    `resultado` VARCHAR(191) NULL,
    `fecha_partida` DATETIME(3) NOT NULL,
    `torneo_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_partida`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `INSCRIPCION` (
    `id_inscripcion` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER NOT NULL,
    `torneo_id` INTEGER NOT NULL,
    `fecha_inscripcion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `INSCRIPCION_usuario_id_torneo_id_key`(`usuario_id`, `torneo_id`),
    PRIMARY KEY (`id_inscripcion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TORNEOS` ADD CONSTRAINT `TORNEOS_creador_id_fkey` FOREIGN KEY (`creador_id`) REFERENCES `USUARIO`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PARTIDA` ADD CONSTRAINT `PARTIDA_torneo_id_fkey` FOREIGN KEY (`torneo_id`) REFERENCES `TORNEOS`(`id_torneo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `INSCRIPCION` ADD CONSTRAINT `INSCRIPCION_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `USUARIO`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `INSCRIPCION` ADD CONSTRAINT `INSCRIPCION_torneo_id_fkey` FOREIGN KEY (`torneo_id`) REFERENCES `TORNEOS`(`id_torneo`) ON DELETE RESTRICT ON UPDATE CASCADE;
