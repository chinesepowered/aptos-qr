"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Wallet, LogOut } from "lucide-react";

export function WalletButton() {
  const { connect, disconnect, account, connected, wallets } = useWallet();

  const handleConnect = async () => {
    if (wallets && wallets.length > 0) {
      try {
        await connect(wallets[0].name);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    }
  };

  if (connected && account) {
    return (
      <button
        onClick={disconnect}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span className="hidden sm:inline">
          {account.address.slice(0, 6)}...{account.address.slice(-4)}
        </span>
        <span className="sm:hidden">Disconnect</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
    >
      <Wallet className="w-4 h-4" />
      Connect Wallet
    </button>
  );
}
