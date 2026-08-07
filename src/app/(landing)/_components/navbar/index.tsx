import GlassSheet from "@/components/global/glass-sheet"
import { Button } from "@/components/ui/button"
import { LogOut, MenuIcon } from "lucide-react"
import Link from "next/link"
import Menu from "./menu"

const LandingPageNavbar = () => {
    return (
        <div className="w-full flex justify-between sticky top-0 items-center py-5 z-50">
            <p className="font-bold text-2xl">Ascendia</p>
            <Menu orientation="desktop" />
            <div className="flex gap-2">
                <Link href="/sign-in">
                    <Button
                        variant="outline"
                        className="bg-themeGray rounded-2xl flex gap-2 border-themeGray "
                    >
                        <LogOut />
                        Login
                    </Button>
                </Link>
                <GlassSheet
                    triggerClass="lg:hidden"
                    trigger={
                        <Button
                            variant="ghost"
                            className="hover:bg-transparent hover:text-muted-foreground"
                        >
                            <MenuIcon size={30} />
                        </Button>
                    }
                >
                    <Menu orientation="mobile" />
                </GlassSheet>
            </div>
        </div>
    )
}

export default LandingPageNavbar
