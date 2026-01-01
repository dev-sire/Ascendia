import { usePayments } from '@/hooks/payment';

type Props = {
    userId: string;
    affiliate: boolean;
    stripeId?: string;
}

// WIP: connect the use payments hook

const PaymentForm = ({ userId, affiliate, stripeId }: Props) => {

    const {
        onCreateGroup,
        register,
        isPending,
        errors,
        isCategory,
        creatingIntent
    } = usePayments(userId, affiliate)

    return (
        <div>PaymentForm</div>
    )
}

export default PaymentForm