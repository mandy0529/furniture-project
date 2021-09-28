import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Footer, Navbar, Sidebar} from '.';
import {
  AboutPage,
  AuthWrapper,
  CartPage,
  CheckoutPage,
  ErrorPage,
  HomePage,
  PrivateRoute,
  ProductsPage,
  SingleProductPage,
} from '../pages';

const Router = () => {
  return (
    <AuthWrapper>
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/cart" component={CartPage} />
          <Route exact path="/products" component={ProductsPage} />
          <Route exact path="/products/:id" children={<SingleProductPage />} />
          <PrivateRoute exact path="/checkout">
            <CheckoutPage />
          </PrivateRoute>
          <Route exact path="*" component={ErrorPage} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </AuthWrapper>
  );
};

export default Router;
