import { Container } from "./styles";
import { useState, useEffect } from "react";
import axios from "axios";

interface TransactionResponse {
    id: number;
    amount: number;
    category: string;
    title: string;
    user_id: number;
    created_at: Date;
    type: string
}

export function TransactionsTable() {
    const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const token = localStorage.getItem('authToken');
    
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `http://localhost:8080/transaction`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            user_id: userId,
                        },
                    }
                );
                setTransactions(response.data);
            } catch (error: any) {
                setError("Erro ao carregar transações.");
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [token, userId]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

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
