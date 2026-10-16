import { app } from "./app"
import type { Env } from "./env"

export { Room } from "./room"

const sessionOf = (request: Request): string | undefined =>
  request.headers.get("cookie")?.match(/(?:^|;\s*)session=([^;]+)/)?.[1]

export default {
  // Every request goes to the Hono app. The API answers only those who are signed in.
  async fetch(request, env, ctx) {
    if (new URL(request.url).pathname.startsWith("/api/")) {
      const session = sessionOf(request)
      if (!session || !(await env.SESSIONS.get(session)))
        return new Response("Sign in first", { status: 401 })
    }
    return app.fetch(request, env, ctx)
  },
} satisfies ExportedHandler<Env>
