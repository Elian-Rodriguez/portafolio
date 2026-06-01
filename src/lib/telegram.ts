const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || import.meta.env.REACT_APP_TELEGRAM_BOT_TOKEN
const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID || import.meta.env.REACT_APP_CHAT_TELEGRAM

export const isTelegramConfigured = Boolean(token && chatId)

export interface ContactPayload {
  name: string
  email: string
  phone: string
  message: string
}

/**
 * Sends the contact form to Telegram.
 *
 * NOTE: In a pure SPA the bot token is shipped to the client. This mirrors the
 * original behaviour. For production hardening, proxy this through a serverless
 * function (Vercel/Netlify) so the token stays server-side.
 */
export async function sendContactMessage(p: ContactPayload): Promise<void> {
  if (!isTelegramConfigured) {
    throw new Error('Telegram no está configurado')
  }

  const text = [
    '🚀 Nuevo mensaje desde el portafolio',
    '',
    `👤 Nombre: ${p.name}`,
    `✉️ Email: ${p.email}`,
    `📱 Teléfono: ${p.phone}`,
    '💬 Mensaje:',
    p.message,
    '',
    `🕒 ${new Date().toLocaleString('es-ES')}`,
  ].join('\n')

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  })

  if (!res.ok) {
    throw new Error(`Telegram respondió ${res.status}`)
  }
}
