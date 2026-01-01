import { onGetStripeClientSecret } from "@/actions/payment"
import { createGroupSchema } from "@/components/forms/create-group/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"

export const useStripeElements = () => {
    const stripePromise = async () => await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY as string)
    return { stripePromise }
}

export const usePayments = (
    userId: string, 
    affiliate: boolean, 
    stripeId?: string
) => {

    const router = useRouter()
    const [isCategory, setIsCategory] = useState<string | undefined>(undefined)

    const stripe = useStripe()
    const elements = useElements()

    const {
        reset,
        handleSubmit,
        formState: { errors },
        register,
        watch,
    } = useForm<z.infer<typeof createGroupSchema>>({
        resolver: zodResolver(createGroupSchema),
        defaultValues: {
            category: "",
        },
    })

    useEffect(() => {
        const category = watch(({ category }) => {
            if(category){
                setIsCategory(category)
            }
        })
        return () => category.unsubscribe()
    }, [watch])

    const { data: intent, isPending: creatingIntent } = useQuery({
        queryKey: ["payment-intent"],
        queryFn: () => onGetStripeClientSecret(),
    })
}