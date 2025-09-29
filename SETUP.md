# AptPay - Quick Setup Guide

## Build Fix Applied ✅

The build error with `keyv` dynamic imports has been fixed by:
1. Removed `--turbopack` flag from build scripts
2. Added webpack config to handle optional keyv dependencies
3. Added proper TypeScript type assertions for Aptos function calls

## Running the App

```bash
# Development
pnpm dev

# Production build
pnpm build
pnpm start
```

## Pre-Flight Checklist

### Before Running:
- [x] Dependencies installed (`pnpm install`)
- [x] Petra Wallet browser extension installed
- [x] Get testnet APT from [Aptos Faucet](https://aptoslabs.com/testnet-faucet)

### File Structure:
```
✅ app/page.tsx - Home page
✅ app/merchant/page.tsx - Merchant panel
✅ app/pay/page.tsx - Customer payment
✅ components/WalletProvider.tsx - Wallet setup
✅ components/WalletButton.tsx - Connect button
✅ components/QRScanner.tsx - QR scanner
✅ lib/constants.ts - Token configs
✅ lib/payment-utils.ts - Utilities
✅ next.config.ts - Build configuration
```

## Testing Flow

### 1. Merchant Side (No wallet needed)
1. Open http://localhost:3000
2. Click "Merchant Panel"
3. Enter receiving address: `0x...`
4. Select token: APT
5. Enter amount: `0.1`
6. Click "Generate QR Code"
7. Copy payment string

### 2. Customer Side (Wallet required)
1. Go back to home
2. Click "Customer Payment"
3. Connect Petra Wallet
4. Paste the payment string from merchant
5. Review details
6. Click "Confirm & Pay"
7. Approve in Petra
8. View transaction on explorer

## Troubleshooting

### Build errors?
- Make sure you removed `--turbopack` flag
- Run `pnpm install` again
- Clear `.next` folder and rebuild

### Wallet connection issues?
- Install Petra Wallet extension
- Make sure you're on Testnet
- Refresh the page

### Transaction failures?
- Ensure you have testnet APT
- Check recipient address is valid
- Verify you're on Aptos Testnet

## Supported Tokens

**APT (Default)**
- Native Aptos coin
- 8 decimals
- Get from faucet

**USDC (Testnet)**
- Fungible Asset
- 6 decimals
- Address: `0x69091fbab5f7d635ee7ac5098cf0c1efbe31d68fec0f2cd565e8d168daf52832`

## Technical Notes

- Uses Next.js 15.5 with standard webpack (not Turbopack)
- Client-side wallet signing (non-custodial)
- Payment strings are base64-encoded JSON
- All transactions on Aptos Testnet
- No backend required - fully client-side

## Demo Scenario

**Merchant:** "Coffee costs 0.5 APT"
1. Merchant generates QR/string for 0.5 APT to their address
2. Customer scans or pastes
3. Customer confirms and pays
4. Both can verify on Aptos Explorer

**Success!** ☕️→💰
