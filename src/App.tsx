import { RouterProvider } from "react-router-dom";
import { router } from "./routers/main.routes";

export function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
