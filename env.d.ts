interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly SPOTIFY_CLIENT_ID: string
  readonly SPOTIFY_CLIENT_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
