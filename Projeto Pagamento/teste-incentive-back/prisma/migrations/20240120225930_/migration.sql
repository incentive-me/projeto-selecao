-- CreateTable
CREATE TABLE `Pagamentos` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `valor` INTEGER NOT NULL,
    `saldos_Id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Saldos` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `valorInicial` INTEGER NOT NULL,
    `valorRestante` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pagamentos` ADD CONSTRAINT `Pagamentos_saldos_Id_fkey` FOREIGN KEY (`saldos_Id`) REFERENCES `Saldos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
