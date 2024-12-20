import { RouteObject } from "react-router-dom";
import { Transaction } from "../page";

const transactionRoutes: RouteObject[] = [
  {
    path: "/transaction",
    element: <Transaction />,
  },
];

export { transactionRoutes };
