import { RouteObject } from "react-router-dom";
import { authLoader } from "../../../routers/loader.routes";
import { Dashboard } from "../page";

const dashboardRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    loader: authLoader
  },
];

export { dashboardRoutes };
