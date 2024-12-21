import { RouteObject } from "react-router-dom";
import { authLoader } from "../../../routers/loader.routes";
import { Dashboard } from "../page";
import { TransactionsProvider } from "../../../shared/hooks/useTransactions";

const dashboardRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: (
      <TransactionsProvider>
        <Dashboard />
      </TransactionsProvider>
    ),
    loader: authLoader,
  },
];

export { dashboardRoutes };
