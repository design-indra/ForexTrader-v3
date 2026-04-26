# QA Checklist – ForexTrader v3

## Authentication
- [ ] Login with correct credentials works
- [ ] Login with wrong credentials shows error
- [ ] Session cookie is HttpOnly
- [ ] No API keys in localStorage

## Dashboard
- [ ] Equity curve loads and refreshes every 10s
- [ ] Stat cards show values
- [ ] Dark mode works
- [ ] Mobile responsive

## Backtest
- [ ] Backtest API returns results
- [ ] Equity curve renders

## Telegram
- [ ] Test message sent successfully
- [ ] Settings saved

## Security
- [ ] CSP headers present
- [ ] HSTS header present
- [ ] Unauthenticated users redirected to /login

## PWA
- [ ] Manifest loads
- [ ] Service worker registered
