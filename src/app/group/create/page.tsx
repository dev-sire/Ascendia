import { onAuthenticatedUser } from '@/actions/auth'
import { onGetAffiliateInfo } from '@/actions/groups'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const GroupCreatePage = async ({ searchParams }: {
    searchParams: { [affiliate: string]: string }
}) => {

    const user = await onAuthenticatedUser()
    const affiliate = await onGetAffiliateInfo(searchParams.affiliate)

    if(!user || !user.id) redirect("/sign-in")

  return (
    <>
        <div className="px-7 flex flex-col">
            <h5 className='font-bold text-base text-themeTextWhite'>
                Payment Method
            </h5>
            <p className='text-themeTextGray leading-tight'>
                Free for 14 days, then 999 PKR/month. Cancel anytime. All features. Unlimited everything. No hidden fees.
            </p>
            {affiliate.status === 200 && (
                <div className="w-full mt-5 flex justify-center items-center gap-x-2 italic text-themeTextGray text-sm">
                    You were reffered by
                    <Avatar>
                        <AvatarImage
                            src={affiliate.user?.Group?.User.image as string}
                            alt="user"
                        ></AvatarImage>
                        <AvatarFallback>
                            <User />
                        </AvatarFallback>
                    </Avatar>
                    {affiliate.user?.Group?.User?.firstName}{" "}
                    {affiliate.user?.Group?.User?.lastName}
                </div>
            )}
        </div>
    </>
  )
}

export default GroupCreatePage