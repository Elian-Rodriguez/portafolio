/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTENTFUL_SPACE: string
  readonly VITE_CONTENTFUL_ENVIRONMENT: string
  readonly VITE_CONTENTFUL_ACCESS_TOKEN: string
  readonly VITE_TELEGRAM_BOT_TOKEN: string
  readonly VITE_TELEGRAM_CHAT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
