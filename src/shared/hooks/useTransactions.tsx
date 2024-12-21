import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { findTransactionService } from "../components/TransactionsTable/service/transaction.service";
import { errorHandler } from "../api/errorHandler";

interface Transaction {
  id: number;
  user_id: number;
  title: string;
  amount: number;
  category: string;
  type: string;
  created_at: Date;
}

type TransactionInput = Omit<Transaction, "id" | "created_at">;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  getTransactions: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function getTransactions() {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.warn("Tentativa de buscar transações sem token válido.");
      return;
    }
    try {
      const response = await findTransactionService.execute();
      setTransactions(response);
    } catch (error) {
      errorHandler(error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      getTransactions();
    }
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, getTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  return context;
}
