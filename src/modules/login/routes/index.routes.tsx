import { RouteObject } from "react-router-dom";
import Login from "../page";

const loginRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Login />,
  },
];

export { loginRoutes };
