import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./layout/DefaultLayout";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Payment from "./components/pagamentos/Payments";
import Balance from "./components/balance/balance";
import NewPayment from "./components/pagamentos/newPayments";
import UpdatePayment from "./components/pagamentos/updatePayment";
import NewBalance from "./components/balance/NewBalance";
import UpdateBalance from "./components/balance/updateBalance";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/home" element={<DefaultLayout />}>
        <Route path="/home" element={<Payment />} />
      </Route>
      <Route path="/balance" element={<DefaultLayout />}>
        <Route path="/balance" element={<Balance />} />
      </Route>

      <Route path="/payment/create" element={<DefaultLayout />}>
        <Route path="/payment/create" element={<NewPayment />} />
      </Route>
      <Route path="/payment/:id" element={<DefaultLayout />}>
        <Route path="/payment/:id" element={<UpdatePayment />} />
      </Route>

      <Route path="/balance/create" element={<DefaultLayout />}>
        <Route path="/balance/create" element={<NewBalance />} />
      </Route>
      <Route path="/balance/:id" element={<DefaultLayout />}>
        <Route path="/balance/:id" element={<UpdateBalance />} />
      </Route>
    </Routes>
  );
}
