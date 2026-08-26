import { PrismaClient } from "@prisma/client"

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// Singleton pattern that works in both dev (module hot-reload) and
// production (Vercel serverless — each invocation must reuse the same
// module-level instance rather than opening a fresh connection).
export const client =
  globalThis.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
  })

// Always assign to globalThis so the next invocation in the same
// Lambda container reuses the existing client instead of reconnecting.
globalThis.prisma = client