"use client"

import { useStripeElements } from "@/hooks/payment";
import { Elements } from "@stripe/react-stripe-js";

type StripeElementsProps = {
    children: React.ReactNode;
}

export const StripeElement = ({ children }: StripeElementsProps) => {

    const { stripePromise} = useStripeElements()
    const promise = stripePromise()

    return promise && <Elements stripe={promise}>{children}</Elements>
}