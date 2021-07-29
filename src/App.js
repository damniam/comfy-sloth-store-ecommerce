import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
  Home,
  Error,
  Product,
  Checkout,
  PrivateRoute,
  About,
  Cart,
  SingleProduct,
  AuthWrapper,
} from "./pages";

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/cart" exact>
            <Cart />
          </Route>
          <PrivateRoute path="/checkout" exact>
            <Checkout />
          </PrivateRoute>
          <Route path="/products" exact>
            <Product />
          </Route>
          <Route path="/products/:id" children={<SingleProduct />} />
          <Route path="*">
            <Error />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </AuthWrapper>
  );
}

export default App;
