import { Outlet } from "react-router-dom";
import { useState } from "react";

import Navbar from "../components/Navbar";
import CartDrawer from "../components/CartDrawer";

function CustomerLayout() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <Navbar openCart={() => setIsCartOpen(true)} />

      <CartDrawer
        isOpen={isCartOpen}
        closeCart={() => setIsCartOpen(false)}
     />

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default CustomerLayout;