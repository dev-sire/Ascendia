import { Button } from "@/components/ui/button"
import { Logout } from "@/icons/logout"
import Link from "next/link"
import Menu from "./menu"

type Props = {}

const LandingPageNavbar = (props: Props) => {
    return (
        <div className="w-full flex sticky justify-between top-0 items-center py-5 z-50">
            <p className="font-bold text-2xl">Ascendia</p>
            <Menu orientation="desktop" />
            <div className="flex gap-2">
                <Link href="/sign-in">
                    <Button
                        variant="ghost"
                        className="bg-themeBlack rounded-2xl flex gap-2 border-themeGray hover:bg-themeGray hover:border-themeGray hover:text-white"
                    >
                        <Logout />
                        Login
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default LandingPageNavbar