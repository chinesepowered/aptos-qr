// Aptos Testnet Configuration
export const NETWORK = "testnet";
export const NODE_URL = "https://api.testnet.aptoslabs.com/v1";

// Token Configurations
export const TOKENS = {
  APT: {
    name: "Aptos",
    symbol: "APT",
    decimals: 8,
    address: "0x1::aptos_coin::AptosCoin",
    isNative: true,
  },
  USDC: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0x69091fbab5f7d635ee7ac5098cf0c1efbe31d68fec0f2cd565e8d168daf52832",
    isNative: false,
  },
} as const;

export type TokenType = keyof typeof TOKENS;

// Payment Request Structure
export interface PaymentRequest {
  chain: string;
  token: TokenType;
  amount: string;
  recipient: string;
  memo?: string;
}
