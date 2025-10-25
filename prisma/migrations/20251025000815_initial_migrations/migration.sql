-- CreateTable
CREATE TABLE "USUARIO" (
    "id_usuario" SERIAL NOT NULL,
    "email" TEXT,
    "nombre" TEXT NOT NULL,
    "password" TEXT,
    "ELO" INTEGER,
    "isGuest" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "USUARIO_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "TORNEOS" (
    "id_torneo" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "reglas" TEXT,
    "premios" TEXT,
    "tipo_torneo" TEXT,
    "creador_id" INTEGER NOT NULL,

    CONSTRAINT "TORNEOS_pkey" PRIMARY KEY ("id_torneo")
);

-- CreateTable
CREATE TABLE "PARTIDA" (
    "id_partida" SERIAL NOT NULL,
    "resultado" TEXT,
    "fecha_partida" TIMESTAMP(3) NOT NULL,
    "torneo_id" INTEGER NOT NULL,

    CONSTRAINT "PARTIDA_pkey" PRIMARY KEY ("id_partida")
);

-- CreateTable
CREATE TABLE "INSCRIPCION" (
    "id_inscripcion" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "torneo_id" INTEGER NOT NULL,
    "fecha_inscripcion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "INSCRIPCION_pkey" PRIMARY KEY ("id_inscripcion")
);

-- CreateIndex
CREATE UNIQUE INDEX "USUARIO_email_key" ON "USUARIO"("email");

-- CreateIndex
CREATE UNIQUE INDEX "INSCRIPCION_usuario_id_torneo_id_key" ON "INSCRIPCION"("usuario_id", "torneo_id");

-- AddForeignKey
ALTER TABLE "TORNEOS" ADD CONSTRAINT "TORNEOS_creador_id_fkey" FOREIGN KEY ("creador_id") REFERENCES "USUARIO"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PARTIDA" ADD CONSTRAINT "PARTIDA_torneo_id_fkey" FOREIGN KEY ("torneo_id") REFERENCES "TORNEOS"("id_torneo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "INSCRIPCION" ADD CONSTRAINT "INSCRIPCION_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "USUARIO"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "INSCRIPCION" ADD CONSTRAINT "INSCRIPCION_torneo_id_fkey" FOREIGN KEY ("torneo_id") REFERENCES "TORNEOS"("id_torneo") ON DELETE RESTRICT ON UPDATE CASCADE;
