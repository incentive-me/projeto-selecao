import { CreateBalanceRequest } from '.';

export type UpdateBalanceRequest = Partial<
  Omit<CreateBalanceRequest, 'initialValue'>
>;
