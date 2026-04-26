# ForexTrader v3 – Professional Automated Forex Bot

> **DISCLAIMER**: This application is for **educational and simulation** purposes only.
> Forex trading carries a **high risk of loss**. We are **not** financial advisors.
> BAPPEBTI regulations apply in Indonesia.

## Tech Stack
| Layer | Tech |
|-------|------|
| Framework | Next.js 15 (App Router) |
| Auth | NextAuth v5 (HttpOnly cookie) |
| Database | PostgreSQL + Prisma |
| Styling | Tailwind CSS + shadcn/ui |
| Charts | Recharts |
| Logging | Pino |
| Telegram | node-telegram-bot-api |
| Testing | Jest |
| Deploy | Vercel / Railway |

## Features (Phase 1-6)
- **Security**: HttpOnly session, CSP, HSTS, rate-limiting, no localStorage secrets
- **Dashboard**: Real-time equity curve, win-rate, drawdown, live PnL
- **Back-testing**: Historical simulation with equity curve
- **Telegram Alerts**: Entry/exit/pause/error notifications
- **Strategy Customizer**: RSI, EMA, ATR, risk params via UI
- **UI/UX**: Dark/Light mode, PWA, responsive layout
- **Observability**: Pino logs, Sentry, Vercel Analytics

## Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in values
cp .env.example .env

# 3. Run DB migrations
npx prisma migrate dev --name init

# 4. Generate Prisma client
npx prisma generate

# 5. Start dev server
npm run dev
```

Open http://localhost:3000/login

## Generate Admin Password Hash
```bash
node -e "console.log(require('bcryptjs').hashSync('YOUR_PASSWORD', 10))"
```
Paste the result into `AUTH_PASSWORD_HASH` in your `.env`.

## Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm test` | Run Jest tests |
| `npm run type-check` | TypeScript check |
| `npm run lint` | ESLint check |

## Deployment
See `docs/DEPLOYMENT.md` for Vercel and Railway guides.

## Risk Disclaimer
1. For educational/simulation only - no profit guarantee
2. BAPPEBTI regulations apply in Indonesia
3. Max 1 open position, loss-streak auto-pause enforced
4. By using this software you accept all risk
