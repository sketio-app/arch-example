import { DurableObject } from "cloudflare:workers"
import type { Env } from "./env"

/** One board's live room: everyone on the board gets each new note. */
export class Room extends DurableObject<Env> {
  async fetch(request: Request): Promise<Response> {
    if (request.headers.get("upgrade") !== "websocket")
      return new Response("Expected a WebSocket", { status: 426 })
    const [client, server] = Object.values(new WebSocketPair())
    this.ctx.acceptWebSocket(server)
    return new Response(null, { status: 101, webSocket: client })
  }

  webSocketMessage(_ws: WebSocket, message: string | ArrayBuffer): void {
    for (const peer of this.ctx.getWebSockets()) peer.send(message)
  }
}

export function openRoom(env: Env, board: string, request: Request): Promise<Response> {
  return env.ROOM.get(env.ROOM.idFromName(board)).fetch(request)
}
