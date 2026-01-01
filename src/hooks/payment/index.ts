import { onCreateNewGroup } from "@/actions/groups"
import { onGetStripeClientSecret, onTransferCommission } from "@/actions/payment"
import { createGroupSchema } from "@/components/forms/create-group/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe, StripeCardElement } from "@stripe/stripe-js"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
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

    const { mutateAsync: createGroup, isPending } = useMutation({
        mutationFn: async (data: z.infer<typeof createGroupSchema>) => {
            if(!stripe || !elements || !intent){
                return null
            }

            const { error, paymentIntent } = await stripe.confirmCardPayment(
                intent.secret!,
                {
                    payment_method: {
                        card: elements.getElement(
                            CardElement
                        ) as StripeCardElement
                    },
                },
            )

            if(error){
                return toast("Error", {
                    description: "Oops! something went wrong. try again later."
                })
            }

            if(paymentIntent?.status === "succeeded"){
                if(affiliate){
                    await onTransferCommission(stripeId!)
                }
                const created = await onCreateNewGroup(userId, data)
                if(created && created.status === 200){
                    toast("Success", {
                        description: created.message
                    })
                    router.push(`/group/${created.data?.group[0].id}/channel/${created.data?.group[0].channel[0].id}`)
                }
                if(created && created.status !== 200){
                    reset()
                    return toast("Error", {
                        description: created.message
                    })
                }
            }
        },
    })

    const onCreateGroup = handleSubmit(async (values) => createGroup(values))

    return {
        onCreateGroup,
        isPending,
        register,
        errors,
        isCategory,
        creatingIntent
    }
}