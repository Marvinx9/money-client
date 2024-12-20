type FindTransactionInputDto = {
  search?: string;
  user_id?: number;
};

type TransactionOutputDto = {
  id: number;
  user_id: number;
  title: string;
  amount: number;
  category: string;
  type: string;
  created_at: Date;
};

export type { TransactionOutputDto, FindTransactionInputDto };
