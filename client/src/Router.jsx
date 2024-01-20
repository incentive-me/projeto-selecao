import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import PaymentSection from "./components/Section/Payment/PaymentSection";
import BalanceSection from "./components/Section/Balance/BalanceSection";

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
        {
          path: "/saldos",
          element: <BalanceSection />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
