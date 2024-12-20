import { useState, useEffect } from "react";
import { Container } from "./styles";
import { TransactionOutputDto } from "../service/transaction.dto";
import { findTransactionService } from "../service/transaction.service";
import { errorHandler } from "../../../shared/api/errorHandler";

export function TransactionsTable() {
  const [transactions, setTransactions] = useState<TransactionOutputDto[]>([]);

  async function getTransaction() {
    try {
      const response = await findTransactionService.execute();
      setTransactions(response);
    } catch (error) {
      errorHandler(error);
    }
  }

  useEffect(() => {
    getTransaction();
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Intl.DateTimeFormat("pt-BR").format(
                  new Date(transaction.created_at)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
