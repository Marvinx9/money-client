import { AxiosInstance } from "axios";
import { http } from "../../../api/https";
import { NewTransactionInputDto } from "./transaction.dto";

class NewTransactionService {
  constructor(private readonly api: AxiosInstance) {}

  async execute(data: NewTransactionInputDto): Promise<void> {
    const response = await this.api.post<void>("/transaction", data);

    return response.data;
  }
}
const newTransactionService = new NewTransactionService(http);

export { newTransactionService };
