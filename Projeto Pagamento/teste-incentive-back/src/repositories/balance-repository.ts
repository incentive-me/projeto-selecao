import { Saldos, Prisma } from "@prisma/client";

export interface BalancesRepository {
  create(data: Prisma.SaldosUncheckedCreateInput): Promise<Saldos>;
  getBalances(): Promise<Saldos[]>;
  deleteBalances(balanceId: string): Promise<Saldos>;
  updateBalances(balanceId: string, newName: string): Promise<Saldos>;
  filterBalanceId(balanceId: string): Promise<Saldos | null>;
  updateBalanceValue(balanceId: string, newValue: number): Promise<Saldos>;
}
