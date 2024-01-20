import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import PaymentSection from "./components/Section/Payment/PaymentSection";
import BalanceSection from "./components/Section/Balance/BalanceSection";
import CreatePayment from "./components/Section/Payment/CreatePayment";
import CreateBalance from "./components/Section/Balance/CreateBalance";
import EditBalance from "./components/Section/Balance/EditBalance";
import EditPayment from "./components/Section/Payment/EditPayment";

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
          path: "/pagamentos/editar",
          element: <EditPayment />,
        },
        {
          path: "/saldos",
          element: <BalanceSection />,
        },
        {
          path: "/saldos/criar",
          element: <CreateBalance />,
        },
        {
          path: "/saldos/editar",
          element: <EditBalance />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
