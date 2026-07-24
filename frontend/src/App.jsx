import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import RestaurantDetails from "./pages/RestaurantDetails";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";

import ProtectedRoute from "./components/ProtectedRoute";

// Owner Dashboard
import OwnerLayout from "./layouts/OwnerLayout";
import Dashboard from "./pages/owner/Dashboard";
import ComboPackages from "./pages/owner/ComboPackages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ==========================
            CUSTOMER ROUTES
        ========================== */}

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

        {/* ==========================
            OWNER DASHBOARD
        ========================== */}

        <Route
          path="/owner"
          element={
            <ProtectedRoute>
              <OwnerLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="packages"
            element={<ComboPackages />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;