import { createBrowserRouter } from "react-router-dom";
import { loginRoutes } from "../modules/login/routes/index.routes";
import { transactionRoutes } from "../modules/transaction/routes/routes";

const router = createBrowserRouter([...loginRoutes, ...transactionRoutes]);

export { router };
