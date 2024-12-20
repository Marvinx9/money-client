import { createBrowserRouter } from "react-router-dom";
import { loginRoutes } from "../modules/login/routes/index.routes";
import { dashboardRoutes } from "../modules/dashboard/routes/routes";

const router = createBrowserRouter([...loginRoutes, ...dashboardRoutes]);

export { router };
