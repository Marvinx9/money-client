import { RouterProvider } from "react-router-dom";
import { router } from "./routers/main.routes";
import { GlobalStyle } from "./styles/global";

export function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}
