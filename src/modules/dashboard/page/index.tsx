import { useState } from "react";
import { Header } from "../../../shared/components/Header";
import { Summary } from "../../../shared/components/Summary/page";
import { TransactionsTable } from "../../../shared/components/TransactionsTable/page";
import { Container } from "./styles";
import { NewTransactionModal } from "../../../shared/components/newTransactionModal";

export function Dashboard() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  
  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false)
  }
  
  return (
    <Container>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
        <NewTransactionModal
          isOpen={isNewTransactionModalOpen}
          onRequestClose={handleCloseNewTransactionModal}
        />
      <Summary />
      <TransactionsTable />
    </Container>
  );
}
