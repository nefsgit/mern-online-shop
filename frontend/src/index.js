import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import productsReducer, { productsFetch } from './features/productsSlice';
import cartReducer, { getTotals } from './features/cartSlice';
import authReducer, { loadUser } from './features/authSlice';
import ordersReducer from './features/ordersSlice';
import usersReducer from './features/usersSlice';
import categoriesReducer, { categoriesFetch } from './features/categoriesSlice';
import subcategoriesReducer, { subcategoriesFetch } from './features/subcategoriesSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    subcategories: subcategoriesReducer,
    orders: ordersReducer,
    users: usersReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

store.dispatch(productsFetch());
store.dispatch(categoriesFetch());
store.dispatch(subcategoriesFetch());
store.dispatch(getTotals());
store.dispatch(loadUser(null));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
