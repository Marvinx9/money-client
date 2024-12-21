import { createBrowserRouter } from "react-router-dom";
import { loginRoutes } from "../modules/login/routes/index.routes";
import { dashboardRoutes } from "../modules/dashboard/routes/routes";
import { newTransactionModalRoutes } from "../shared/components/newTransactionModal/routes/index.routes";
import { criarContaModalRoutes } from "../modules/criarConta/routes/index.routes";

const router = createBrowserRouter([
  ...loginRoutes,
  ...dashboardRoutes,
  ...newTransactionModalRoutes,
  ...criarContaModalRoutes,
]);

export { router };
