import { onGetUserGroups } from "@/actions/groups"
import GlassSheet from "@/components/global/glass-sheet"
import Notification from "@/components/global/user-widget/notification"
import { UserAvatar } from "@/components/global/user-widget/user"
import { SheetClose, SheetTitle } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { LandingButton } from "../landing-auth"
import Menu from "./menu"
import { NavShell } from "./shell"

type Props = {
  /** Present when the visitor is signed in. */
  user?: { id: string; image: string }
}

const LandingPageNavbar = async ({ user }: Props) => {
  // Same data the explore navbar's account menu uses (owned groups → settings).
  const groups = user ? await onGetUserGroups(user.id) : null
  const ownedGroups = (groups?.groups ?? []).map((g: { id: string; name: string }) => ({
    id: g.id,
    name: g.name,
  }))
  const ownsGroup = ownedGroups.length > 0

  // /callback/sign-in already routes owners to their group and everyone else
  // to group creation, so "Dashboard" reuses it instead of re-deriving routes.
  const primary = user ? (
    ownsGroup ? (
      <LandingButton href="/callback/sign-in" size="sm">
        Dashboard
      </LandingButton>
    ) : (
      <LandingButton href="/group/create" size="sm">
        Create group
      </LandingButton>
    )
  ) : (
    <LandingButton href="/sign-up" size="sm">
      Get started
    </LandingButton>
  )

  return (
    <NavShell>
      {/* Wordmark */}
      <Link
        href="/"
        className="group flex items-center gap-2.5 rounded-xl px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6C96B]/60"
      >
        <Image
          src="/logo.png"
          alt=""
          width={28}
          height={28}
          className="flex-shrink-0 rounded-lg object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <span
          className="select-none text-xl font-bold tracking-tight"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#F7ECE9" }}
        >
          Ascendia<span style={{ color: "#C9A84C" }}>.</span>
        </span>
      </Link>

      <Menu orientation="desktop" />

      <div className="flex items-center gap-2 md:gap-3">
        {user ? (
          <>
            <div className="hidden sm:block">{primary}</div>
            <Notification
              className="h-10 w-10 rounded-full transition-colors hover:bg-white/10"
              iconClassName="h-6 w-6"
            />
            <div className="rounded-full ring-1 ring-[rgba(201,168,76,0.4)] ring-offset-2 ring-offset-[#09090B] transition-shadow hover:ring-[#E6C96B]">
              <UserAvatar
                userid={user.id}
                image={user.image}
                ownedGroups={ownedGroups}
              />
            </div>
          </>
        ) : (
          <>
            <LandingButton
              href="/sign-in"
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Sign in
            </LandingButton>
            {primary}
          </>
        )}

        <GlassSheet
          triggerClass="lg:hidden"
          trigger={
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(201,168,76,0.25)] text-[#C9A84C] transition-colors hover:bg-[rgba(201,168,76,0.1)]">
              <MenuIcon size={20} />
              <span className="sr-only">Open menu</span>
            </span>
          }
        >
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Menu orientation="mobile">
            {user ? (
              <SheetClose asChild>{primary}</SheetClose>
            ) : (
              <>
                <SheetClose asChild>
                  <LandingButton href="/sign-in" variant="ghost">
                    Sign in
                  </LandingButton>
                </SheetClose>
                <SheetClose asChild>{primary}</SheetClose>
              </>
            )}
          </Menu>
        </GlassSheet>
      </div>
    </NavShell>
  )
}

export default LandingPageNavbar
