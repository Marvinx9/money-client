import { RouteObject } from "react-router-dom";
import CriarContaModal from "../page";

const criarContaModalRoutes: RouteObject[] = [
  {
    path: "/criar-conta",
    element: <CriarContaModal />,
  },
];

export { criarContaModalRoutes };
