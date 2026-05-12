import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function CartBar() {
  const { cart, finalTotal } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Only show on these pages
  const showOnRoutes = ["/place-order"];

  const shouldShow = showOnRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  if (cart.length === 0 || !shouldShow) return null;

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-black text-white flex justify-between items-center px-4 py-3 shadow-lg z-50 rounded-t-xl">
      
      <div>
        <p className="text-xs">{cart.length} items</p>
        <p className="font-bold">₹{finalTotal}</p>
      </div>

      <button
        onClick={() => navigate("/cart")}
        className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold"
      >
        View Cart →
      </button>
    </div>
  );
}