import { ProtectedRoute } from "./ProtectedRoute";
import ProtectedLayout from "@/layout/ProtectedLayout";
import OverView from "@/pages/OverView";

const userRoutes = {
  path: "/",
  element: <ProtectedRoute />,
  children: [
    {
      path: "home",
      element: <ProtectedLayout />,
      children: [
        {
          index: true,
          element: <OverView />,
        },
      ],
    },
  ],
};

export default userRoutes;
