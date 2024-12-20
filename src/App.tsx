import { RouterProvider } from "react-router-dom";
import { router } from "./routers/main.routes";
import { TransactionsProvider } from "./shared/hooks/useTransactions";

export function App() {
  return (
    <>
      <TransactionsProvider>
        <RouterProvider router={router} />
      </TransactionsProvider>
    </>
  );
}
