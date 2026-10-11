import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LoaderCircle,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

import API from "../config/api";
import { CartContext } from "../context/CartContext";

export default function CashfreeReturn() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);

//   const startedRef = useRef(false);

  const [status, setStatus] = useState("checking");
  const [message, setMessage] = useState(
    "Cashfree se payment status verify ho raha hai..."
  );

  useEffect(() => {
  let cancelled = false;

  const verifyPayment = async () => {
    try {
      const params = new URLSearchParams(location.search);

      const cashfreeOrderId =
        params.get("order_id") ||
        params.get("cf_order_id") ||
        sessionStorage.getItem("pendingCashfreeOrderId");

      const internalOrderId =
        sessionStorage.getItem("pendingPaymentOrderId") ||
        sessionStorage.getItem("latestOrderId");

      console.log("Cashfree Return Debug:", {
        cashfreeOrderId,
        internalOrderId,
        url: window.location.href,
        tokenExists: Boolean(localStorage.getItem("token")),
      });

      if (!cashfreeOrderId) {
        setStatus("failed");
        setMessage(
          "Cashfree order ID nahi mila. Agar amount debit hua hai to dobara payment mat karein."
        );
        return;
      }

      if (!internalOrderId) {
        setStatus("failed");
        setMessage(
          "Zusko order ID nahi mili. Agar amount debit hua hai to dobara payment mat karein."
        );
        return;
      }

      for (let attempt = 1; attempt <= 6; attempt++) {
        if (cancelled) return;

        try {
          setStatus("checking");

          setMessage(
            attempt === 1
              ? "Payment verify ho rahi hai..."
              : `Payment confirmation ka wait ho raha hai... (${attempt}/6)`
          );

          const response = await API.post("/payment/verify", {
            orderId: internalOrderId,
            cashfreeOrderId,
          });

          if (cancelled) return;

          const data = response?.data;

          console.log("Cashfree Verify Response:", data);

          if (
            data?.success === true &&
            data?.status === "SUCCESS"
          ) {
            sessionStorage.setItem(
              "latestOrderId",
              String(internalOrderId)
            );

            sessionStorage.setItem("orderSuccess", "true");

            sessionStorage.removeItem("pendingPaymentOrderId");
            sessionStorage.removeItem("pendingCashfreeOrderId");

            clearCart();

            setStatus("success");
            setMessage(
              "Payment successful! Your Zusko order has been confirmed."
            );

            setTimeout(() => {
              if (!cancelled) {
                navigate("/success", {
                  replace: true,
                });
              }
            }, 1200);

            return;
          }

          if (data?.status === "PENDING") {
            if (attempt < 6) {
              setStatus("pending");

              setMessage(
                "Payment receive ho gayi hai. Cashfree confirmation ka wait ho raha hai..."
              );

              await new Promise((resolve) =>
                setTimeout(resolve, 2000)
              );

              continue;
            }

            setStatus("pending");

            setMessage(
              "Payment abhi confirm nahi hui. Agar amount debit hua hai to dobara payment mat karein."
            );

            return;
          }

          if (data?.status === "FAILED") {
            setStatus("failed");

            setMessage(
              data?.message ||
                "Payment unsuccessful hui. Aap dobara payment try kar sakte hain."
            );

            return;
          }

          if (attempt < 6) {
            await new Promise((resolve) =>
              setTimeout(resolve, 2000)
            );

            continue;
          }

          setStatus("failed");

          setMessage(
            data?.message ||
              "Payment status confirm nahi ho paaya. Agar amount debit hua hai to dobara payment mat karein."
          );

          return;
        } catch (error) {
          console.error(
            "Cashfree verification attempt failed:",
            error?.response?.data || error
          );

          if (attempt < 6) {
            setStatus("pending");

            setMessage(
              "Payment status verify ho raha hai..."
            );

            await new Promise((resolve) =>
              setTimeout(resolve, 2000)
            );

            continue;
          }

          setStatus("failed");

          setMessage(
            error?.response?.data?.message ||
              "Payment status verify nahi ho paaya. Agar amount debit hua hai to dobara payment mat karein."
          );

          return;
        }
      }
    } catch (error) {
      console.error("Cashfree return page error:", error);

      if (!cancelled) {
        setStatus("failed");

        setMessage(
          "Payment verification mein problem aa gayi. Agar amount debit hua hai to dobara payment mat karein."
        );
      }
    }
  };

  verifyPayment();

  return () => {
    cancelled = true;
  };
}, [location.search, navigate, clearCart]);

  const handleBack = () => {
    navigate("/place-order", {
      replace: true,
    });
  };

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-16">
      <div className="flex min-h-[70vh] items-center justify-center">
        <section className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-xl">

          {/* STATUS ICON */}

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-50">

            {status === "checking" && (
              <LoaderCircle
                size={38}
                className="animate-spin text-[#D4AF00]"
              />
            )}

            {status === "pending" && (
              <LoaderCircle
                size={38}
                className="animate-spin text-[#D4AF00]"
              />
            )}

            {status === "success" && (
              <CheckCircle2
                size={42}
                className="text-green-600"
              />
            )}

            {status === "failed" && (
              <AlertCircle
                size={42}
                className="text-red-500"
              />
            )}
          </div>

          {/* TITLE */}

          <h1 className="text-2xl font-black text-gray-900">
            {status === "checking" &&
              "Verifying Payment"}

            {status === "pending" &&
              "Payment Confirmation Pending"}

            {status === "success" &&
              "Payment Successful"}

            {status === "failed" &&
              "Payment Not Confirmed"}
          </h1>

          {/* MESSAGE */}

          <p className="mt-4 text-sm leading-6 text-gray-600">
            {message}
          </p>

          {/* SUCCESS */}

          {status === "success" && (
            <div className="mt-7 rounded-2xl bg-green-50 p-4 text-sm font-semibold text-green-700">
              Your order has been confirmed successfully.
            </div>
          )}

          {/* PENDING */}

          {status === "pending" && (
            <div className="mt-7 rounded-2xl bg-yellow-50 p-4 text-sm font-semibold text-yellow-800">
              Please don't refresh repeatedly or make another payment.
            </div>
          )}

          {/* FAILED */}

          {status === "failed" && (
            <button
              type="button"
              onClick={handleBack}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFD700] px-5 py-4 font-black text-black transition hover:bg-yellow-400"
            >
              <ArrowLeft size={18} />
              Back to Payment
            </button>
          )}

          {/* SECURITY MESSAGE */}

          <div className="mt-8 border-t border-gray-100 pt-5">
            <p className="text-xs text-gray-400">
              Secure payment verification by Cashfree
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}