import { RouteObject } from "react-router-dom";
import { NewTransactionModal } from "../page";
import { authLoader } from "../../../../routers/loader.routes";

function handleOpenNewTransactionModal() {
  return;
}

const newTransactionModalRoutes: RouteObject[] = [
  {
    path: "/transaction",
    element: (
      <NewTransactionModal
        isOpen
        onRequestClose={handleOpenNewTransactionModal}
      />
    ),
    loader: authLoader,
  },
];

export { newTransactionModalRoutes };
