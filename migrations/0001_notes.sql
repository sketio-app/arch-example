CREATE TABLE notes (
  id TEXT PRIMARY KEY,
  board TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX notes_board ON notes (board, created_at);
