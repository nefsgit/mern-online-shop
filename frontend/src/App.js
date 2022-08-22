import './App.css';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Cart from './components/Cart';
import Home from './components/Home';
import NotFound from './components/NotFound';

import { ToastContainer } from 'react-toastify';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import CheckoutSuccess from './components/CheckoutSuccess';
import PreCheckout from './components/PreCheckout';
import Dashboard from './components/admin/Dashboard';
import Products from './components/admin/Products';
import Categories from './components/admin/Categories';
import Subcategories from './components/admin/Subcategories';
import Summary from './components/admin/Summary';
import { useState } from 'react';
import CreateProduct from './components/admin/CreateProduct';
import ProductsList from './components/admin/lists/ProductsList';
import CategoriesList from './components/admin/lists/CategoriesList';
import SubcategoriesList from './components/admin/lists/SubcategoriesList';
import Orders from './components/admin/Orders';
import Users from './components/admin/Users';
import Product from './components/details/Product';
import Order from './components/details/Order';
import UserProfile from './components/details/UserProfile';
import UserOrders from './components/UserOrders';
import { QueryClientProvider, QueryClient } from 'react-query';
import CreateCategory from './components/admin/CreateCategory';
import CreateSubcategory from './components/admin/CreateSubcategory';
import Reviews from './components/admin/Reviews';

function App() {

  const [navOpen, setNavOpen] = useState(false);
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
      <BrowserRouter>

        <ToastContainer />

        <NavBar navOpen={navOpen} setNavOpen={setNavOpen} sideNavOpen={sideNavOpen} setSideNavOpen={setSideNavOpen} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-orders" element={<UserOrders />} />
          <Route path="/pre-checkout" element={<PreCheckout />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/1j34-admin-yt6g" element={<Dashboard navOpen={navOpen} sideNavOpen={sideNavOpen} setSideNavOpen={setSideNavOpen} />}>
            <Route path="products" element={<Products />}>
              <Route index element={<ProductsList />} />
              <Route path="create" element={<CreateProduct />} />
            </Route>
            <Route path="categories" element={<Categories />}>
              <Route index element={<CategoriesList />} />
              <Route path="create" element={<CreateCategory />} />
            </Route>
            <Route path="subcategories" element={<Subcategories />}>
              <Route index element={<SubcategoriesList />} />
              <Route path="create" element={<CreateSubcategory />} />
            </Route>
            <Route path="summary" element={<Summary />} />
            <Route path="orders" element={<Orders />} />
            <Route path="users" element={<Users />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>

      </BrowserRouter>
    </div>
    </QueryClientProvider>
  );
}

export default App;
