# ⚡ AptPay

**The future of merchant payments on Aptos**

AptPay is a lightning-fast, QR-based crypto payment system that makes accepting digital currencies as easy as scanning a code. Built on the Aptos blockchain, AptPay delivers instant, secure, and frictionless payment experiences for both merchants and customers.

![Aptos Testnet](https://img.shields.io/badge/Aptos-Testnet-green)
![Next.js](https://img.shields.io/badge/Next.js-15.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## 🎯 Why AptPay?

**For Merchants:**
- ⚡ **Instant Settlement** - Payments confirmed in seconds, not days
- 🔒 **Non-Custodial** - You control your funds, no intermediaries
- 📱 **Zero Setup** - No merchant accounts, just your wallet address
- 💰 **Low Fees** - Blockchain-native transactions with minimal costs
- 🌐 **Global Reach** - Accept payments from anyone, anywhere

**For Customers:**
- 📲 **Simple Flow** - Scan QR or paste payment string
- 🔐 **Secure** - Client-side signing, your keys never leave your device
- ✅ **Transparent** - Every transaction verifiable on-chain
- 🚀 **Fast** - Aptos blockchain speed and efficiency

## ✨ Features

### 🏪 Merchant Panel
- Configure receiving wallet address
- Select token (APT or USDC)
- Set payment amount
- Add optional memo
- Generate QR code instantly
- Export payment string for sharing

### 💳 Customer Payment
- Connect Aptos wallet (Petra, etc.)
- Scan QR code with camera
- Or paste payment string manually
- Review payment details
- Confirm and send transaction
- View transaction on Aptos Explorer

### 🔒 Security
- Non-custodial wallet integration
- Client-side transaction signing
- No private keys stored
- Testnet environment for safe testing

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** installed
- **pnpm** package manager (`npm install -g pnpm`)
- **[Petra Wallet](https://petra.app/)** browser extension
- **Testnet APT** tokens (get from [Aptos Faucet](https://aptoslabs.com/testnet-faucet))

### Installation

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Run development server:**
   ```bash
   pnpm dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 How to Use

### For Merchants

1. Go to **Merchant Panel** from home page
2. Enter your Aptos wallet address to receive payments
3. Select token (APT or USDC)
4. Enter the payment amount
5. Add optional memo/description
6. Click **Generate QR Code**
7. Share the QR code or payment string with customers

### For Customers

1. Go to **Customer Payment** from home page
2. Click **Connect Wallet** and approve Petra Wallet connection
3. Either:
   - Click **Open Camera to Scan** and scan merchant's QR code
   - Or paste the payment string from merchant
4. Review payment details (amount, token, recipient)
5. Click **Confirm & Pay**
6. Approve transaction in Petra Wallet
7. Wait for confirmation and view transaction on explorer

## 🪙 Supported Tokens

### Testnet APT (Default)
- **Symbol:** APT
- **Decimals:** 8
- **Type:** Native Aptos Coin
- **Get testnet APT:** [Aptos Faucet](https://aptoslabs.com/testnet-faucet)

### Testnet USDC
- **Symbol:** USDC
- **Decimals:** 6
- **Type:** Fungible Asset
- **Address:** `0x69091fbab5f7d635ee7ac5098cf0c1efbe31d68fec0f2cd565e8d168daf52832`
- **Explorer:** [View on Aptos Explorer](https://explorer.aptoslabs.com/fungible_asset/0x69091fbab5f7d635ee7ac5098cf0c1efbe31d68fec0f2cd565e8d168daf52832?network=testnet)

## 🏗️ Project Structure

```
aptos-qr/
├── app/
│   ├── layout.tsx           # Root layout with wallet provider
│   ├── page.tsx             # Home page with navigation
│   ├── merchant/
│   │   └── page.tsx         # Merchant control panel
│   └── pay/
│       └── page.tsx         # Customer payment page
├── components/
│   ├── WalletProvider.tsx   # Aptos wallet adapter setup
│   ├── WalletButton.tsx     # Connect/disconnect wallet button
│   └── QRScanner.tsx        # QR code scanner component
├── lib/
│   ├── constants.ts         # Token configs and types
│   └── payment-utils.ts     # Payment encoding/decoding utilities
└── package.json
```

## 🔧 Technical Details

### Tech Stack
- **Framework:** Next.js 15.5 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS 4
- **Blockchain:** Aptos Testnet
- **Wallet:** Petra Wallet Adapter
- **QR Codes:** qrcode.react + html5-qrcode
- **Icons:** Lucide React

### Payment Request Format

Payment requests are encoded as base64 JSON strings:

```typescript
{
  chain: "aptos-testnet",
  token: "APT" | "USDC",
  amount: "10.5",
  recipient: "0x1234...5678",
  memo?: "Optional description"
}
```

### Transaction Types

**APT Transfers:**
```typescript
0x1::aptos_account::transfer(recipient, amount)
```

**USDC Transfers (Fungible Asset):**
```typescript
0x1::primary_fungible_store::transfer(
  metadata, 
  recipient, 
  amount
)
```

## 🎨 Design Features

- Clean, modern UI with gradient backgrounds
- Responsive design (mobile, tablet, desktop)
- Professional card-based layouts
- Smooth transitions and hover effects
- Clear visual feedback for all actions
- Color-coded by functionality (blue for merchant, purple for customer)

## 🧪 Testing

### Test Flow

1. **Setup:**
   - Install Petra Wallet
   - Create/import wallet
   - Get testnet APT from faucet

2. **Merchant Side:**
   - Use your wallet address as recipient
   - Generate QR code for 0.1 APT
   - Copy payment string

3. **Customer Side:**
   - Connect different wallet
   - Paste payment string
   - Confirm and send
   - Verify on explorer

## 🛠️ Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Environment

The app is configured for Aptos Testnet by default. Configuration is in `lib/constants.ts`:

```typescript
export const NETWORK = "testnet";
export const NODE_URL = "https://api.testnet.aptoslabs.com/v1";
```

## 💡 Key Features

- **Dual Interface** - Separate optimized experiences for merchants and customers
- **Flexible Payment Methods** - QR code scanning or manual string pasting
- **Multi-Token Support** - APT and USDC with extensible architecture
- **No Backend Required** - Fully client-side, deploy anywhere
- **Mobile-Responsive** - Works seamlessly on all devices

## 🌟 Use Cases

- **Retail Stores** - Accept crypto at point of sale
- **Online Merchants** - Generate payment links for e-commerce
- **Service Providers** - Request payments with custom amounts
- **P2P Transfers** - Send money between friends instantly
- **Event Payments** - Quick ticket sales and vendor payments

## 🔗 Resources

- [Aptos Documentation](https://aptos.dev/)
- [Aptos Explorer (Testnet)](https://explorer.aptoslabs.com/?network=testnet)
- [Petra Wallet](https://petra.app/)
- [Aptos TypeScript SDK](https://aptos.dev/sdks/ts-sdk/)
- [Aptos Faucet](https://aptoslabs.com/testnet-faucet)

## 🛣️ Roadmap

- [ ] Multi-wallet support (Pontem, Martian, etc.)
- [ ] Transaction history and analytics
- [ ] Invoice generation and management
- [ ] Custom token support
- [ ] Mainnet deployment
- [ ] Mobile native apps
- [ ] Merchant dashboard with reporting
- [ ] Recurring payment support

<div align="center">

**Built with ❤️ on Aptos**

[Website](#) • [Documentation](#) • [Discord](#) • [Twitter](#)

⚡ **AptPay - Payment at the Speed of Thought** ⚡

</div>
