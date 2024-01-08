import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from "react-router-dom";
  import { PrivateRoute } from "./PrivateRoute";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Layout from "../pages/layout/Layout";
import Payment from "../pages/payment/Payment";
import NewPayment from "../pages/payment/NewPayment";
import UpdatePayment from "../pages/payment/UpdatePayment";
import Balance from "../pages/balance/Balance";

  
  export const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<PrivateRoute />}>
          <Route path={"/"} element={<Layout />}>
            <Route path={"/pagamentos"} element={<Payment />} />
            <Route path={"/pagamentos/criar"} element={<NewPayment />} />
            <Route path={"/pagamentos/editar"} element={<UpdatePayment />} />
            <Route path={"/saldos"} element={<Balance />} />
          </Route>
        </Route>
        <Route path={"/entrar"} element={<Login />} />
        <Route path={"/registrar"} element={<Register />} />
      </>
    )
  );