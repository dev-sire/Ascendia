"use server"

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    typescript: true,
    apiVersion: "2024-06-20",
})

export const onGetStripeClientSecret = async () => {
    console.log("this ran")
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "pkr",
            amount: 990000,
            automatic_payment_methods: {
                enabled: true,
            },
        })
        console.log("Payment Intent", paymentIntent)
        if (paymentIntent) {
            return { secret: paymentIntent.client_secret }
        }
    } catch (error) {
        return { status: 400, message: "Failed to load form" }
    }
}

export const onTransferCommission = async (destination: string) => {
    try {
        const transfer = await stripe.transfers.create({
            amount: 396000,
            currency: "pkr",
            destination: destination,
        })

        if (transfer) {
            return { status: 200 }
        }
    } catch (error) {
        return { status: 400 }
    }
}
