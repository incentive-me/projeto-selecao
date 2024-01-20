import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import PaymentSection from "./components/Section/Payment/PaymentSection";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/pagamentos",
          element: <PaymentSection />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
