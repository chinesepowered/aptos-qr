"use client";

import { useState } from "react";
import Link from "next/link";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import {
  ArrowLeft,
  Smartphone,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { WalletButton } from "@/components/WalletButton";
import { QRScanner } from "@/components/QRScanner";
import { TOKENS, PaymentRequest } from "@/lib/constants";
import { decodePaymentRequest, parseAmountToSmallestUnit } from "@/lib/payment-utils";

const aptosConfig = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(aptosConfig);

type TransactionStatus = "idle" | "confirming" | "processing" | "success" | "error";

export default function PaymentPage() {
  const { account, signAndSubmitTransaction } = useWallet();
  const [pasteValue, setPasteValue] = useState("");
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
  const [status, setStatus] = useState<TransactionStatus>("idle");
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  const handleScan = (data: string) => {
    processPaymentString(data);
    setShowScanner(false);
  };

  const handlePaste = () => {
    if (!pasteValue.trim()) {
      setError("Please enter a payment string");
      return;
    }
    processPaymentString(pasteValue);
  };

  const processPaymentString = (encoded: string) => {
    setError("");
    const decoded = decodePaymentRequest(encoded);
    
    if (!decoded) {
      setError("Invalid payment string. Please check and try again.");
      return;
    }

    setPaymentRequest(decoded);
    setStatus("confirming");
  };

  const handleConfirmPayment = async () => {
    if (!account || !paymentRequest) return;

    setStatus("processing");
    setError("");

    try {
      const token = TOKENS[paymentRequest.token];
      const amountInSmallestUnit = parseAmountToSmallestUnit(
        paymentRequest.amount,
        token.decimals
      );

      let response;

      if (token.isNative) {
        // APT transfer
        response = await signAndSubmitTransaction({
          sender: account.address,
          data: {
            function: "0x1::aptos_account::transfer" as `${string}::${string}::${string}`,
            typeArguments: [],
            functionArguments: [paymentRequest.recipient, amountInSmallestUnit.toString()],
          },
        });
      } else {
        // Fungible Asset (USDC) transfer
        response = await signAndSubmitTransaction({
          sender: account.address,
          data: {
            function: "0x1::primary_fungible_store::transfer" as `${string}::${string}::${string}`,
            typeArguments: [],
            functionArguments: [
              token.address,
              paymentRequest.recipient,
              amountInSmallestUnit.toString(),
            ],
          },
        });
      }

      // Wait for transaction
      const txResult = await aptos.waitForTransaction({
        transactionHash: response.hash,
      });

      setTxHash(response.hash);
      setStatus("success");
    } catch (err) {
      console.error("Payment failed:", err);
      setError(err instanceof Error ? err.message : "Payment failed. Please try again.");
      setStatus("error");
    }
  };

  const handleReset = () => {
    setPaymentRequest(null);
    setStatus("idle");
    setTxHash("");
    setError("");
    setPasteValue("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Make Payment
                </h1>
                <p className="text-gray-600">Scan QR or paste payment string</p>
              </div>
            </div>
            <WalletButton />
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
          {!account ? (
            /* Not Connected */
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Connect Your Wallet
              </h2>
              <p className="text-gray-600 mb-6">
                Please connect your Aptos wallet to make payments
              </p>
              <WalletButton />
            </div>
          ) : status === "idle" ? (
            /* Scan or Paste */
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Scan QR Code
                </h2>
                
                {showScanner ? (
                  <QRScanner
                    onScan={handleScan}
                    onError={(err) => setError(err)}
                  />
                ) : (
                  <button
                    onClick={() => setShowScanner(true)}
                    className="w-full px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Open Camera to Scan
                  </button>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">OR</span>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Paste Payment String
                </h2>
                <div className="space-y-3">
                  <textarea
                    value={pasteValue}
                    onChange={(e) => setPasteValue(e.target.value)}
                    placeholder="Paste payment string here..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all font-mono text-sm"
                  />
                  <button
                    onClick={handlePaste}
                    className="w-full px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg transition-colors"
                  >
                    Process Payment
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
            </div>
          ) : status === "confirming" && paymentRequest ? (
            /* Confirm Payment */
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-yellow-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Confirm Payment
                </h2>
                <p className="text-gray-600">
                  Please review the payment details before confirming
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600">Amount</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {paymentRequest.amount} {TOKENS[paymentRequest.token].symbol}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Token</span>
                    <span className="font-medium text-gray-900">
                      {TOKENS[paymentRequest.token].name}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Network</span>
                    <span className="font-medium text-gray-900">
                      {paymentRequest.chain}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">To</span>
                    <span className="font-mono text-sm text-gray-900">
                      {paymentRequest.recipient.slice(0, 8)}...
                      {paymentRequest.recipient.slice(-6)}
                    </span>
                  </div>

                  {paymentRequest.memo && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Memo</span>
                      <span className="text-gray-900">{paymentRequest.memo}</span>
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmPayment}
                  className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Confirm & Pay
                </button>
              </div>
            </div>
          ) : status === "processing" ? (
            /* Processing */
            <div className="text-center py-12">
              <Loader2 className="w-16 h-16 text-purple-600 animate-spin mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Processing Payment
              </h2>
              <p className="text-gray-600">
                Please wait while your transaction is being processed...
              </p>
            </div>
          ) : status === "success" ? (
            /* Success */
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Payment Successful!
              </h2>
              <p className="text-gray-600 mb-6">
                Your payment has been processed successfully
              </p>

              {txHash && (
                <div className="mb-6">
                  <a
                    href={`https://explorer.aptoslabs.com/txn/${txHash}?network=testnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
                  >
                    View Transaction
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              )}

              <button
                onClick={handleReset}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
              >
                Make Another Payment
              </button>
            </div>
          ) : status === "error" ? (
            /* Error */
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Payment Failed
              </h2>
              <p className="text-gray-600 mb-6">{error || "An error occurred"}</p>

              <button
                onClick={handleReset}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
