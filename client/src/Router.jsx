import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import PaymentSection from "./components/Section/Payment/PaymentSection";
import BalanceSection from "./components/Section/Balance/BalanceSection";
import CreatePayment from "./components/Section/Payment/CreatePayment";

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
          path: "/pagamentos/criar",
          element: <CreatePayment />,
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
