import { AxiosInstance } from "axios";
import { http } from "../../../api/https";
import { TransactionOutputDto } from "./transaction.dto";

class FindTransactionService {
  constructor(private readonly api: AxiosInstance) {}

  async execute(): Promise<TransactionOutputDto[]> {
    const response = await this.api.get<TransactionOutputDto[]>("/transaction");

    return response.data;
  }
}
const findTransactionService = new FindTransactionService(http);

export { findTransactionService };
