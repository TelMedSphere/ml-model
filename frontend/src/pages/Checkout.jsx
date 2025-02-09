import React, { useState, useContext, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { 
  Alert,
  AlertDescription,
  AlertTitle 
} from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import httpClient from "../httpClient";
import CheckoutForm from "./CheckoutForm";
import Preloader from "../components/common/Preloader";
import commonContext from "../contexts/common/commonContext";
import useScrollDisable from "../hooks/useScrollDisable";
import { AlertCircle, CreditCard } from "lucide-react";

const stripePromise = loadStripe(`${import.meta.env.VITE_PUBLICATION_KEY}`);

export default function Checkout() {
  const { isLoading, toggleLoading } = useContext(commonContext);
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const initializeCheckout = async () => {
      try {
        toggleLoading(true);
        setError(null);
        
        // Get total amount from localStorage
        const amount = localStorage.getItem("totalPrice");
        if (!amount) {
          throw new Error("No total amount found. Please try again.");
        }
        setTotalAmount(parseFloat(amount));

        // Create payment intent
        const response = await httpClient.post("/create-payment-intent", {
          amount,
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        setClientSecret(response.data.clientSecret);
      } catch (err) {
        setError(
          err.response?.data?.message || 
          err.message || 
          "An error occurred while initializing checkout. Please try again."
        );
      } finally {
        toggleLoading(false);
      }
    };

    initializeCheckout();
  }, [toggleLoading]);

  useScrollDisable(isLoading);

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#0284c7',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
      borderRadius: '0.5rem',
    }
  };

  const options = {
    clientSecret,
    appearance,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Preloader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CreditCard className="h-6 w-6 text-blue-600" />
            <CardTitle>Secure Checkout</CardTitle>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Total Amount: ${totalAmount.toFixed(2)}
          </p>
        </CardHeader>
        <CardContent>
          {clientSecret ? (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          ) : (
            <div className="text-center py-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Unable to load checkout</AlertTitle>
                <AlertDescription>
                  Please refresh the page or try again later.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}