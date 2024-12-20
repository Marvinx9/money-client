import { Summary } from "../../../shared/components/Summary/page";
import { TransactionsTable } from "../../../shared/components/TransactionsTable/page";
import { Container } from "./styles";


export function Dashboard() {
  return (
    <Container>
      <Summary />
      <TransactionsTable />
    </Container>
  );
}
