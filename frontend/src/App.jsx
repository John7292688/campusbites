import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import RestaurantDetails from "./pages/RestaurantDetails";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import CustomerLayout from "./layouts/CustomerLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./components/ProtectedRoute";
import OwnerProtectedRoute from "./components/OwnerProtectedRoute";

// Owner Pages
import OwnerLayout from "./layouts/OwnerLayout";
import Dashboard from "./pages/owner/Dashboard";
import ComboPackages from "./pages/owner/ComboPackages";
import OwnerLogin from "./pages/owner/OwnerLogin";
import MenuItems from "./pages/owner/MenuItems";
import MenuCategories from "./pages/owner/MenuCategories";
import Orders from "./pages/owner/Orders";
import Restaurant from "./pages/owner/Restaurant";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ==========================
    CUSTOMER ROUTES
========================== */}

<Route element={<CustomerLayout />}>
  <Route path="/" element={<Home />} />

  <Route
    path="/restaurants/:id"
    element={<RestaurantDetails />}
  />

  <Route
    path="/login"
    element={<Login />}
  />

  <Route
    path="/cart"
    element={
      <ProtectedRoute>
        <Cart />
      </ProtectedRoute>
    }
  />

  <Route
    path="/order-success"
    element={
      <ProtectedRoute>
        <OrderSuccess />
      </ProtectedRoute>
    }
  />

  <Route
    path="/my-orders"
    element={
      <ProtectedRoute>
        <MyOrders />
      </ProtectedRoute>
    }
  />

  <Route
    path="/orders/:orderId"
    element={
      <ProtectedRoute>
        <OrderDetails />
      </ProtectedRoute>
    }
  />
</Route>

<Route
  path="/owner/login"
  element={<OwnerLogin />}
/>

        {/* ==========================
            OWNER ROUTES
        ========================== */}

        <Route
          path="/owner"
          element={
            <OwnerProtectedRoute>
              <OwnerLayout />
            </OwnerProtectedRoute>
          }
        >
          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          <Route
            path="restaurant"
            element={<Restaurant />}
          />

          <Route
            path="packages"
            element={<ComboPackages />}
          />

          <Route
            path="menu-categories"
            element={<MenuCategories />}
          />

          <Route
            path="menu-items"
            element={<MenuItems />}
          />

          <Route
            path="orders"
            element={<Orders />}
          />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;