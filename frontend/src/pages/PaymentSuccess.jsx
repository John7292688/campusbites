import { useEffect } from "react";
import {
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import { verifyPayment } from "../services/paymentService";

function PaymentSuccess() {
  const [searchParams] =
    useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function verify() {
      try {
        const reference =
          searchParams.get("reference");

        console.log(
          "Reference:",
          reference
        );

        if (!reference) {
          toast.error(
            "No payment reference found"
          );

          navigate("/");

          return;
        }
        
        console.time("VERIFY_PAYMENT");
        const response =
          await verifyPayment(reference);

          console.timeEnd("VERIFY_PAYMENT");

        console.log(
          "Verify response:",
          response
        );

        toast.success(
          "Payment verified successfully"
        );

        navigate("/order-success");
      } catch (error) {
        console.error(error);

        toast.error(
          error.message ||
            "Payment verification failed"
        );

        navigate("/");
      }
    }

    verify();
  }, [searchParams, navigate]);

  return (
    <h2>
      Verifying payment...
    </h2>
  );
}

export default PaymentSuccess;