import { Router } from "express";
import { GetPayment } from "./controllers/payment-controller/get-payment-controller";
import { CreatePayment } from "./controllers/payment-controller/create-payment-controller";
import { DeletePayment } from "./controllers/payment-controller/delete-payment-controller";
import { UpdatePayment } from "./controllers/payment-controller/update-payment-controller";
import { CreateUser } from "./controllers/user-controller/create-user-controller";
import { LoginUser } from "./controllers/user-controller/login-user-controller";
import { authMiddleware } from "./middlewares/authMiddleware";
import { GetBalance } from "./controllers/balance-controller/get-balance-controller";
import { CreateBalance } from "./controllers/balance-controller/create-balance-controller";
import { UpdateBalance } from "./controllers/balance-controller/update-balance-controller";
import { DeleteBalances } from "./controllers/balance-controller/delete-balance-controller";

const routes = Router();

routes.post("/user", CreateUser);
routes.post("/login", LoginUser);

routes.use(authMiddleware);

routes.get("/payment", GetPayment);
routes.post("/payment", CreatePayment);
routes.delete("/payment/:paymentID", DeletePayment);
routes.patch("/payment/:paymentID", UpdatePayment);

routes.get("/balance", GetBalance);
routes.post("/balance", CreateBalance);
routes.delete("/balance/:balanceId", DeleteBalances);
routes.patch("/balance/:balanceId", UpdateBalance);

export default routes;
