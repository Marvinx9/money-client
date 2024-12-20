import { RouteObject } from "react-router-dom";
import Login from "../page";

const loginRoutes: RouteObject[] = [
  {
    path: "/auth/login",
    element: <Login />,
  },
];

export { loginRoutes };
