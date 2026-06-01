/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Preferred (Vite) variables
  readonly VITE_CONTENTFUL_SPACE?: string
  readonly VITE_CONTENTFUL_ENVIRONMENT?: string
  readonly VITE_CONTENTFUL_ACCESS_TOKEN?: string
  readonly VITE_TELEGRAM_BOT_TOKEN?: string
  readonly VITE_TELEGRAM_CHAT_ID?: string

  // Legacy CRA variables (also supported as fallback)
  readonly REACT_APP_SPACE?: string
  readonly REACT_APP_ENVIRONMENT?: string
  readonly REACT_APP_ACCESS_TOKEN?: string
  readonly REACT_APP_TELEGRAM_BOT_TOKEN?: string
  readonly REACT_APP_CHAT_TELEGRAM?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
