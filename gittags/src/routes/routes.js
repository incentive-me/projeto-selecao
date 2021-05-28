import { BrowserRouter, Route } from "react-router-dom";

import { Login, Landing } from "../page";

export function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/landing" exact component={Landing} />
    </BrowserRouter>
  );
}
