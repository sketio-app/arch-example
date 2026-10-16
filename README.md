# arch-example

[日本語](#日本語) | [English](#english)

## 日本語

[Sketio Arch](https://arch.sketio.app) の見本のリポジトリです。Arch のトップページにある構成図の例は、このリポジトリを Arch で解析した結果です。

中身は Cloudflare Workers で動く小さなメモのアプリです。ボードにメモと写真を置けて、同じボードを開いている人にはメモがすぐ届きます。

| 使っているもの | binding | 用途 |
|---|---|---|
| D1 | `DB` | メモ |
| R2 | `PHOTOS` | 写真 |
| Durable Object | `ROOM` | ボードごとの WebSocket |
| KV | `SESSIONS` | ログインのセッション |

ルートは [Hono](https://hono.dev) で書いています（`src/app.ts`）。

### Arch で読むとどうなるか

- binding は `wrangler.jsonc` に書いてあります。Worker から D1、R2、Durable Object、KV への関係は設定で確かめた関係になります
- `src/index.ts` は Hono のアプリをそのまま default export せず、自分の `fetch` の中で `app.fetch` を呼んでいます。このため Hono のアプリがこの Worker で動いていることは推測として描かれます
- ルートの処理は `c.env` をほかの関数に渡しているので、ルートがどの binding を使うかは追えません。Arch はこのファイルを追えなかったファイルとして示します

`wrangler.jsonc` の `database_id` と KV の `id` は見本のための値です。自分で動かすときは `wrangler d1 create` と `wrangler kv namespace create` で作った値に替えてください。

ライセンスは MIT です。

## English

A sample repository for [Sketio Arch](https://arch.sketio.app). The example diagram on the Arch home page is what Arch makes of this repository.

It is a small notes app on Cloudflare Workers. You put notes and photos on a board, and everyone who has the same board open gets new notes right away.

| Uses | Binding | For |
|---|---|---|
| D1 | `DB` | Notes |
| R2 | `PHOTOS` | Photos |
| Durable Object | `ROOM` | A WebSocket room per board |
| KV | `SESSIONS` | Sign-in sessions |

The routes are written with [Hono](https://hono.dev) (`src/app.ts`).

### What Arch makes of it

- The bindings are declared in `wrangler.jsonc`, so the relations from the Worker to D1, R2, the Durable Object and KV are confirmed in the settings
- `src/index.ts` does not default-export the Hono app; it calls `app.fetch` inside its own `fetch`. So that the Hono app runs in this Worker is drawn as a guess
- The route handlers pass `c.env` on to other functions, so which bindings a route uses cannot be traced. Arch lists the file as one it could not trace

The `database_id` and the KV `id` in `wrangler.jsonc` are placeholders. To run it yourself, replace them with the ones `wrangler d1 create` and `wrangler kv namespace create` give you.

MIT licensed.
