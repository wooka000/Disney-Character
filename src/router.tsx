import { createBrowserRouter } from "react-router-dom";
import Home from "./page/Home";
import Detail from "./page/Detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/character/:id",
    element: <Detail />,
  },
]);

export default router;
