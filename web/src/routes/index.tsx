import { createBrowserRouter } from "react-router";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";

const router = createBrowserRouter([userRoutes, ...authRoutes]);

export default router;

