import { BrowserRouter, Route } from "react-router-dom";

import { Login, Landing } from "../pages";

export function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/landing" exact component={Landing} />
    </BrowserRouter>
  );
}
