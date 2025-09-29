"use client";

import { useState } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, Copy, Check, Store } from "lucide-react";
import { TOKENS, TokenType, PaymentRequest } from "@/lib/constants";
import { encodePaymentRequest, isValidAptosAddress } from "@/lib/payment-utils";

export default function MerchantPage() {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [selectedToken, setSelectedToken] = useState<TokenType>("APT");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!isValidAptosAddress(recipientAddress)) {
      alert("Please enter a valid Aptos address");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    const paymentRequest: PaymentRequest = {
      chain: "aptos-testnet",
      token: selectedToken,
      amount: amount,
      recipient: recipientAddress,
      memo: memo || undefined,
    };

    const encoded = encodePaymentRequest(paymentRequest);
    setQrValue(encoded);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(qrValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Store className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Merchant Panel
              </h1>
              <p className="text-gray-600">
                Generate payment QR codes for your customers
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Configuration Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Payment Configuration
            </h2>

            <div className="space-y-6">
              {/* Recipient Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Receiving Address *
                </label>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Your Aptos wallet address to receive payments
                </p>
              </div>

              {/* Token Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Token *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(TOKENS).map(([key, token]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedToken(key as TokenType)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedToken === key
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="font-semibold text-gray-900">
                        {token.symbol}
                      </div>
                      <div className="text-xs text-gray-600">{token.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    {TOKENS[selectedToken].symbol}
                  </div>
                </div>
              </div>

              {/* Memo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Memo (Optional)
                </label>
                <input
                  type="text"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="Payment description..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Generate QR Code
              </button>
            </div>
          </div>

          {/* QR Code Display */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Payment QR Code
            </h2>

            {qrValue ? (
              <div className="space-y-6">
                {/* QR Code */}
                <div className="bg-white p-6 rounded-lg border-2 border-gray-200 flex items-center justify-center">
                  <QRCodeSVG value={qrValue} size={240} level="H" />
                </div>

                {/* Payment Details */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Token:</span>
                    <span className="font-semibold text-gray-900">
                      {TOKENS[selectedToken].symbol}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold text-gray-900">
                      {amount} {TOKENS[selectedToken].symbol}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">To:</span>
                    <span className="font-mono text-xs text-gray-900">
                      {recipientAddress.slice(0, 8)}...
                      {recipientAddress.slice(-6)}
                    </span>
                  </div>
                  {memo && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Memo:</span>
                      <span className="text-gray-900">{memo}</span>
                    </div>
                  )}
                </div>

                {/* Payment String */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment String
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={qrValue}
                      readOnly
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg font-mono text-xs"
                    />
                    <button
                      onClick={handleCopy}
                      className="px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                    >
                      {copied ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 text-gray-700" />
                      )}
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Share this string with customers who want to paste instead
                    of scanning
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center p-8">
                <div>
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-600">
                    Configure payment details and click Generate to create your
                    QR code
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
