import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OrderHistory() {
    const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
        navigate('/auth/login')
    }

    axios
      .get(`http://localhost:5000/api/orders/${user.phone}`)
      .then((res) => setOrders(res.data))
      .catch(console.error);
  }, [user]);

  if (!user) return <p className="p-4">Please login</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">My Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border p-3 mb-3 rounded-lg"
        >
          {order.items.map((item) => (
            <p key={item.name}>
              {item.name} ({item.service}) × {item.qty}
            </p>
          ))}

          <p className="font-bold mt-2">₹{order.total}</p>
          <p className="text-sm text-gray-500">
            Status: {order.status}
          </p>
        </div>
      ))}
    </div>
  );
}