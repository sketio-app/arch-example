export interface Env {
  DB: D1Database
  PHOTOS: R2Bucket
  ROOM: DurableObjectNamespace
  SESSIONS: KVNamespace
}
