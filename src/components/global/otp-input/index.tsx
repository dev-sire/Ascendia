import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp"
import React from "react"

type Props = {
    otp: string
    setOtp: React.Dispatch<React.SetStateAction<string>>
}

const OTPInput = ({ otp, setOtp }: Props) => {
    return (
        <InputOTP
            maxLength={6}
            value={otp}
            onChange={(otp) => setOtp(otp)}
            className="text-muted"
        >
            <div className="flex gap-3">
                <div>
                    <InputOTPSlot index={0} className="text-muted" />
                </div>
                <div>
                    <InputOTPSlot index={1} className="text-muted" />
                </div>
                <div>
                    <InputOTPSlot index={2} className="text-muted" />
                </div>
                <div>
                    <InputOTPSlot index={3} className="text-muted" />
                </div>
                <div>
                    <InputOTPSlot index={4} className="text-muted" />
                </div>
                <div>
                    <InputOTPSlot index={5} className="text-muted" />
                </div>
            </div>
        </InputOTP>
    )
}

export default OTPInput
