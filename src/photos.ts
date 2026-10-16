import type { Env } from "./env"

export async function getPhoto(env: Env, key: string): Promise<Response> {
  const object = await env.PHOTOS.get(key)
  if (!object) return new Response("Not found", { status: 404 })
  return new Response(object.body, { headers: { "content-type": object.httpMetadata?.contentType ?? "" } })
}

export async function putPhoto(env: Env, key: string, body: ReadableStream | null): Promise<Response> {
  if (!body) return new Response("No photo", { status: 400 })
  await env.PHOTOS.put(key, body)
  return new Response(null, { status: 204 })
}
