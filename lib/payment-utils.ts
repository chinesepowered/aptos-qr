import { PaymentRequest } from './constants';

// Encode payment request to string (for QR code)
export function encodePaymentRequest(request: PaymentRequest): string {
  return btoa(JSON.stringify(request));
}

// Decode payment request from string
export function decodePaymentRequest(encoded: string): PaymentRequest | null {
  try {
    const decoded = atob(encoded);
    return JSON.parse(decoded) as PaymentRequest;
  } catch (error) {
    console.error('Failed to decode payment request:', error);
    return null;
  }
}

// Validate Aptos address
export function isValidAptosAddress(address: string): boolean {
  // Aptos addresses are 64 hex characters with 0x prefix, or can be shortened
  if (!address.startsWith('0x')) return false;
  const hex = address.slice(2);
  return /^[a-fA-F0-9]{1,64}$/.test(hex);
}

// Format amount for display
export function formatAmount(amount: string, decimals: number): string {
  const num = parseFloat(amount);
  return num.toFixed(decimals);
}

// Parse amount to smallest unit (octas for APT)
export function parseAmountToSmallestUnit(amount: string, decimals: number): bigint {
  const num = parseFloat(amount);
  const multiplier = Math.pow(10, decimals);
  return BigInt(Math.floor(num * multiplier));
}
