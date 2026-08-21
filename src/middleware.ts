import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isProtectedRoute = createRouteMatcher(["/group(.*)"])

export default clerkMiddleware(async (auth, req) => {
  const baseHost = process.env.BASE_HOST || "localhost:3000"
  const host = req.headers.get("host") || ""
  const reqPath = req.nextUrl.pathname
  const origin = req.nextUrl.origin

  // 1. Correct syntax for @clerk/nextjs v5.x
  if (isProtectedRoute(req)) {
    auth().protect()
  }

  // 2. Custom header propagation
  const headers = new Headers(req.headers)
  headers.set("x-current-path", reqPath)

  // 3. Subdomain rewrite logic with failure protection
  if (baseHost && !baseHost.includes(host) && reqPath.includes("/group")) {
    try {
      const response = await fetch(`${origin}/api/domain?host=${host}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        if (data?.status === 200 && data?.domain) {
          return NextResponse.rewrite(
            new URL(reqPath, `https://${data.domain}/${reqPath}`),
            { headers }
          )
        }
      }
    } catch (error) {
      console.error("Middleware rewrite fetch failed:", error)
    }
  }

  return NextResponse.next({ headers })
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}