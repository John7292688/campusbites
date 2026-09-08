import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import OwnerRegister from "./pages/owner/OwnerRegister";
import Partner from "./pages/Partner";
import Home from "./pages/Home";
import RestaurantDetails from "./pages/RestaurantDetails";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import PaymentSuccess from "./pages/PaymentSuccess";
import SearchResults from "./pages/SearchResults";
import OrderDetails from "./pages/OrderDetails";
import Packages from "./pages/Packages";
import CustomerRestaurants from "./pages/Restaurants";
import CustomerLayout from "./layouts/CustomerLayout";
import VerifyOtp from "./pages/VerifyOtp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OwnerForgotPassword from "./pages/owner/OwnerForgotPassword";
import OwnerVerifyOtp from "./pages/owner/OwnerVerifyOtp";
import OwnerResetPassword from "./pages/owner/OwnerResetPassword";
import Checkout from "./pages/Checkout";

import ProtectedRoute from "./components/ProtectedRoute";
import OwnerProtectedRoute from "./components/OwnerProtectedRoute";

// Owner Pages
import OwnerLayout from "./layouts/OwnerLayout";
import AdminLayout from "./layouts/AdminLayout";
import DeliveryLocations from "./pages/admin/DeliveryLocations";
import Messages from "./pages/admin/Messages";
import Dashboard from "./pages/owner/Dashboard";
import ComboPackages from "./pages/owner/ComboPackages";
import OwnerLogin from "./pages/owner/OwnerLogin";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import RestaurantApplication from "./pages/admin/RestaurantApplication";
import Restaurants from "./pages/admin/Restaurants";
import PackageCategories from "./pages/admin/PackageCategories";
import MenuItems from "./pages/owner/MenuItems";
import MenuCategories from "./pages/owner/MenuCategories";
import Orders from "./pages/owner/Orders";
import Restaurant from "./pages/owner/Restaurant";
import Customers from "./pages/owner/Customers";
import Settings from "./pages/owner/Settings";


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
    path="/partner"
    element={<Partner />}
  />

  <Route
    path="/restaurants/:id"
    element={<RestaurantDetails />}
  />

  <Route
    path="/login"
    element={<Login />}
  />

  <Route
    path="/forgot-password"
    element={<ForgotPassword />}
  />

  <Route
    path="/verify-otp"
    element={<VerifyOtp />}
  />

  <Route
    path="/reset-password"
    element={<ResetPassword />}
  />

  <Route
    path="/register"
    element={<Register />}
  />  

  <Route
    path="/restaurants"
    element={<CustomerRestaurants />}
  />

  <Route
    path="/contact"
    element={<Contact />}
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
    path="/checkout"
    element={
      <ProtectedRoute>
        <Checkout />
      </ProtectedRoute>
    }
  />

  <Route path="/packages" element={<Packages />} />

  <Route
    path="/search"
    element={<SearchResults />}
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
    path="/payment-success"
    element={
      <ProtectedRoute>
        <PaymentSuccess />
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
    path="/profile"
    element={
      <ProtectedRoute>
        <Profile />
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

  <Route
    path="/owner/login"
    element={<OwnerLogin />}
  />

  <Route
    path="/owner/forgot-password"
    element={<OwnerForgotPassword />}
  />

  <Route
    path="/owner/verify-otp"
    element={<OwnerVerifyOtp />}
  />

  <Route
    path="/owner/reset-password"
    element={<OwnerResetPassword />}
  />

  <Route
    path="/admin/login"
    element={<AdminLogin />}
  />

  <Route
    path="/owner/register"
    element={<OwnerRegister />}
  />

</Route>
 {/* ==========================
            ADMIN ROUTES
        ========================== */}
  <Route
    path="/admin"
    element={<AdminLayout />}
  >
    <Route
      path="dashboard"
      element={<AdminDashboard />}
    />

    <Route
      path="restaurants"
      element={<Restaurants />}
    />

    <Route
      path="restaurants/:id"
      element={<RestaurantApplication />}
    />

    <Route
      path="package-categories"
      element={<PackageCategories />}
    />

    <Route
      path="delivery-locations"
      element={<DeliveryLocations />}
    />

    <Route
      path="/admin/messages"
      element={<Messages />}
    />
  </Route>


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

          <Route
            path="customers"
            element={<Customers />}
          />

          <Route
            path="settings"
            element={<Settings />}
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