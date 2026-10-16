import type { Env } from "./env"

export interface Note {
  id: string
  board: string
  text: string
  createdAt: string
}

export async function listNotes(env: Env, board: string): Promise<Note[]> {
  const { results } = await env.DB.prepare(
    "SELECT id, board, text, created_at AS createdAt FROM notes WHERE board = ? ORDER BY created_at",
  )
    .bind(board)
    .all<Note>()
  return results
}

export async function addNote(env: Env, board: string, text: string): Promise<Note> {
  const note = { id: crypto.randomUUID(), board, text, createdAt: new Date().toISOString() }
  await env.DB.prepare("INSERT INTO notes (id, board, text, created_at) VALUES (?, ?, ?, ?)")
    .bind(note.id, note.board, note.text, note.createdAt)
    .run()
  return note
}
