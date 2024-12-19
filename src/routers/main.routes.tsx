import { createBrowserRouter } from "react-router-dom";
import { loginRoutes } from "../modules/login/routes/index.routes";

const router = createBrowserRouter([...loginRoutes]);

export { router };
