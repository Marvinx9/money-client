import incomeImg from "../../../asserts/Iconsin.svg";
import outcomeImg from "../../../asserts/Iconsout.svg";
import totalImg from "../../../asserts/Iconstotal.svg";

import { Container } from "./styles";
import { useTransactions } from "../../../hooks/useTransactions";

export function Summary() {
  const { transactions } = useTransactions();

  let summary: {
    deposits: number;
    withdraws: number;
    total: number;
  };

  if (transactions.length < 1) {
    summary = {
      deposits: 0,
      withdraws: 0,
      total: 0,
    };
  } else {
    summary = transactions.reduce(
      (acc, transaction) => {
        const amount = Number(transaction.amount);
        if (transaction.type === "D") {
          acc.deposits += amount;
          acc.total += amount;
        } else {
          acc.withdraws += amount;
          acc.total -= amount;
        }

        return acc;
      },
      {
        deposits: 0,
        withdraws: 0,
        total: 0,
      }
    );
  }

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="saídas" />
        </header>
        <strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(-summary.withdraws)}
        </strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="total" />
        </header>
        <strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  );
}
