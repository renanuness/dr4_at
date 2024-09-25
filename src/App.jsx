import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import { AuthProvider, useAuth } from "./contexts/authContext.jsx";
import Header from "./components/Header/index.jsx";
import UserInfo from "./pages/user-info/index.jsx";
import ForgotPassword from "./pages/forgot-password/index.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Products from "./pages/products/index.jsx";
import Suppliers from "./pages/suppliers/index.jsx";
import ProductDetail from "./pages/productDetail/index.jsx";
import EditProduct from "./pages/editProduct/index.jsx";
import Saved from "./pages/saved/index.jsx";
import AddProduct from "./pages/products/add/index.jsx";
import EditSupplier from "./pages/suppliers/edit/index.jsx";
import AddSupplier from "./pages/suppliers/add/index.jsx";

const PrivateRoute = ({ children }) => {
  const { isLogged } = useAuth();

  return isLogged ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <ToastContainer />
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Header />
              </PrivateRoute>
            }
          />

          <Route
            path="/user-info"
            element={
              <PrivateRoute>
                <UserInfo />
              </PrivateRoute>
            }
          />

          <Route
            path="/products"
            element={
              <PrivateRoute>
                <Header />
                <Products/>
              </PrivateRoute>
            }
            />

            <Route
            path="/products/add"
            element={
              <PrivateRoute>
                <Header />
                <AddProduct/>
              </PrivateRoute>
            }
            />

          <Route
            path="/productDetail/:id"
            element={
              <PrivateRoute>
                <Header />
                <ProductDetail/>
              </PrivateRoute>
            }
            />

          <Route
            path="/editProduct/:id"
            element={
              <PrivateRoute>
                <Header />
                <EditProduct/>
              </PrivateRoute>
            }
            />

          <Route
            path="/suppliers"
            element={
              <PrivateRoute>
                <Header />
                <Suppliers/>
              </PrivateRoute>
            }
            />

          <Route
            path="/editSupplier/:id"
            element={
              <PrivateRoute>
                <Header />
                <EditSupplier/>
              </PrivateRoute>
            }
            />

          <Route
            path="/addSupplier"
            element={
              <PrivateRoute>
                <Header />
                <AddSupplier/>
              </PrivateRoute>
            }
            />

          <Route
            path="/saved"
            element={
              <PrivateRoute>
                <Header />
                <Saved/>
              </PrivateRoute>
            }
            />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
