# Deployment Guide – ForexTrader v3

## Deploy to Vercel

1. Push to GitHub
2. Import repo to Vercel
3. Add environment variables from `.env.example`
4. Deploy

### Post-deploy
```bash
npx prisma migrate deploy
```

## Deploy to Railway

1. Create Railway project → Deploy from GitHub
2. Add PostgreSQL plugin
3. Add environment variables
4. Deploy
5. Run: `railway run npx prisma migrate deploy`

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXTAUTH_URL` | Your app URL |
| `NEXTAUTH_SECRET` | Random 64-byte secret |
| `AUTH_EMAIL` | Admin email |
| `AUTH_PASSWORD_HASH` | bcrypt hash of password |
| `DATABASE_URL` | PostgreSQL connection string |
| `TELEGRAM_BOT_TOKEN` | Optional: Telegram bot token |
| `TELEGRAM_CHAT_ID` | Optional: Telegram chat ID |
