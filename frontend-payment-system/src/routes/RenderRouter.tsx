import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from "react-router-dom";
  import { PrivateRoute } from "./PrivateRoute";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Layout from "../pages/layout/Layout";

  
  export const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<PrivateRoute />}>
          <Route path={"/"} element={<Layout />}>
            {/* <Route path={"/pagamentos"} element={<Payments />} /> */}
            {/* <Route path={"/saldos"} element={<Balance />} /> */}
          </Route>
        </Route>
        <Route path={"/entrar"} element={<Login />} />
        <Route path={"/registrar"} element={<Register />} />
      </>
    )
  );