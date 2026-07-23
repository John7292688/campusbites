import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RestaurantDetails from "./pages/RestaurantDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/restaurants/:id"
          element={<RestaurantDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;