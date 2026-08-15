import GlassSheet from "@/components/global/glass-sheet"
import { Button } from "@/components/ui/button"
import { Logout } from "@/icons"
import { MenuIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Menu from "./menu"

const LandingPageNavbar = () => {
  return (
    <div
      className="w-full flex justify-between sticky top-0 items-center z-50 px-6 md:px-10 py-4"
      style={{
        borderBottom: "1px solid rgba(201,168,76,0.12)",
        background: "rgba(9,9,11,0.82)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Wordmark */}
      <div className="flex items-center gap-2.5">
        <Image
          src="/logo.png"
          alt="Ascendia Logo"
          width={28}
          height={28}
          className="rounded-lg flex-shrink-0 object-contain"
        />
        <p
          className="font-bold text-xl tracking-tight select-none"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#F7ECE9" }}
        >
          Ascendia<span style={{ color: "#C9A84C" }}>.</span>
        </p>
      </div>

      <Menu orientation="desktop" />

      <div className="flex gap-2 items-center">
        <Link href="/sign-in">
          <Button
            variant="outline"
            className="rounded-xl flex gap-2 text-sm font-medium transition-all duration-200 border"
            style={{
              borderColor: "rgba(201,168,76,0.35)",
              background: "rgba(201,168,76,0.07)",
              color: "#C9A84C",
            }}
          >
            <Logout />
            Sign in
          </Button>
        </Link>
        <GlassSheet
          triggerClass="lg:hidden"
          trigger={
            <Button variant="ghost" className="hover:bg-transparent p-1">
              <MenuIcon size={24} style={{ color: "#C9A84C" }} />
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