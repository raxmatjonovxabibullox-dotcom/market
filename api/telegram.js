export default async function handler(req, res) {
  // CORS support
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, description: 'Method not allowed' });
  }

  try {
    const { method = 'sendMessage', body = {}, botToken } = req.body || {};
    const rawToken = (botToken && typeof botToken === 'string') ? botToken.trim() : '';
    const token = rawToken || process.env.TELEGRAM_BOT_TOKEN || '8823235791:AAEOLjLhNRfFw9xp7quwlfucSXEpL8fCtc8';
    const defaultChatId = process.env.TELEGRAM_CHAT_ID || '8170197389';

    if (!body.chat_id && defaultChatId) {
      body.chat_id = defaultChatId;
    }

    if (!token) {
      return res.status(400).json({ ok: false, description: 'Telegram bot token topilmadi' });
    }

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await tgRes.json();
    return res.status(tgRes.status).json(data);
  } catch (error) {
    return res.status(500).json({ ok: false, description: error.message });
  }
}
