import BackdropGradient from '@/components/global/backdrop-gradient';
import GradientText from '@/components/global/gradient-text';
import { ASCENDIA_CONSTANTS } from '@/constants';
import React from 'react';

type Props = {
    children: React.ReactNode;
}

const CreateGroupLayout = ({ children }: Props) => {
  return (
    <div className='container h-screen grid grid-cols-1 lg:grid-cols-2 content-center'>
        <div className="flex items-center">
            <BackdropGradient className='w-8/12 h-2/6 opacity-50'>
                <h5 className='text-2xl font-bold text-themeTextWhite'>
                    Ascendia
                </h5>
                <GradientText
                    element='H2'
                    className='text-4xl font-semibold py-1`'
                >
                    Create a New Group
                </GradientText>
                <p className='text-themeTextGray'>
                    Free for 14 days, then 999 PKR/month. Cancel anytime. All features. Unlimited everything. No hidden fees.
                </p>
                <div className="flex flex-col gap-3 mt-16 pt-5">
                    {ASCENDIA_CONSTANTS.createGroupPlaceholder.map(
                        (placeholder) => (
                            <div key={placeholder.id} className="flex gap-3">
                                {placeholder.icon}
                                <p className="text-themeTextGray">
                                    {placeholder.label}
                                </p>
                            </div>
                        )
                    )}
                </div>
            </BackdropGradient>
        </div>
    </div>
  )
}

export default CreateGroupLayout;