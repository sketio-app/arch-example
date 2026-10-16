import { Hono } from "hono"
import type { Env } from "./env"
import { addNote, listNotes } from "./notes"
import { getPhoto, putPhoto } from "./photos"
import { openRoom } from "./room"

export const app = new Hono<{ Bindings: Env }>()

app.get("/", (c) => c.text("arch-example"))

app.get("/api/boards/:board/notes", async (c) => c.json(await listNotes(c.env, c.req.param("board"))))

app.post("/api/boards/:board/notes", async (c) => {
  const { text } = await c.req.json<{ text: string }>()
  return c.json(await addNote(c.env, c.req.param("board"), text), 201)
})

app.get("/api/photos/:key", async (c) => getPhoto(c.env, c.req.param("key")))

app.put("/api/photos/:key", async (c) => putPhoto(c.env, c.req.param("key"), c.req.raw.body))

// Live updates: the board's room takes over the WebSocket.
app.get("/api/boards/:board/live", (c) => openRoom(c.env, c.req.param("board"), c.req.raw))
