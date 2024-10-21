import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const stripePromise = loadStripe("pk_test_51PGbVmFJHdjwKuJhki8ebg1QMkVlFULFHcOIvWpTNi0rr6XzBhU1CiQRvwFxkWrzaGOeJrSzBzvGOEcuI8ZqM0zf00pSyBdsAV");


const CheckoutForm = () => {
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const submitHandler = async (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!stripe || !elements) return;
        setIsProcessing(true);

        const orderData = {};

        const {paymentIntent, error} = await stripe.confirmPayment({
            elements,
            confirmParams: {return_url: window.location.origin},
            redirect: "if_required",
        });

        if(error){
            toast.error(error.message || "Something went wrong");
        }

        if(paymentIntent?.status === "succeeded"){
            navigate("/orders");
            toast.success("Payment successful");
        }
        setIsProcessing(false);
    }
    return (
        <div className="checkout-container">
        <form onSubmit={submitHandler}>
            <PaymentElement />
            <button>{isProcessing ? "Processing" : "Pay"}</button>
        </form>
    </div>
    )
}

const Checkout = () => {
  const location = useLocation();
  const clientSecret = location.state;
  if(!clientSecret) return <Navigate to={"/shipping"} />

//   const clientSecret = "pi_3QC2UOFJHdjwKuJh1XZP6iBH_secret_S9h5vvhBvDZ7QuX38bRnYLXiK";
  return (
    <Elements stripe={stripePromise} options={{clientSecret}}>
        <CheckoutForm />
    </Elements>
  )
}

export default Checkout

