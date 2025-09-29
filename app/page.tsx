import Link from "next/link";
import { Store, Smartphone, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Aptos QR Merchant
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Accept crypto payments instantly with QR codes on Aptos blockchain
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Testnet Active
          </div>
        </header>

        {/* Main Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Merchant Card */}
          <Link href="/merchant">
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-transparent hover:border-blue-500 cursor-pointer transform hover:-translate-y-1">
              <div className="absolute top-4 right-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Store className="w-6 h-6 text-blue-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-8">
                Merchant Panel
              </h2>
              
              <p className="text-gray-600 mb-6">
                Generate payment QR codes and manage your receiving addresses
              </p>

              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Set receiving address
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Configure token & amount
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Generate QR code
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Share payment string
                </li>
              </ul>

              <div className="inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                Open Merchant Panel
                <span className="text-xl">→</span>
              </div>
            </div>
          </Link>

          {/* Customer Card */}
          <Link href="/pay">
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-transparent hover:border-purple-500 cursor-pointer transform hover:-translate-y-1">
              <div className="absolute top-4 right-4 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6 text-purple-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-8">
                Customer Payment
              </h2>
              
              <p className="text-gray-600 mb-6">
                Scan QR codes or paste payment strings to send crypto
              </p>

              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  Connect wallet
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  Scan QR code
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  Or paste payment string
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  Confirm & send
                </li>
              </ul>

              <div className="inline-flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-3 transition-all">
                Make Payment
                <span className="text-xl">→</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Features */}
        <div className="mt-16 grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Instant</h3>
            <p className="text-sm text-gray-600">
              Fast transactions on Aptos blockchain
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Secure</h3>
            <p className="text-sm text-gray-600">
              Non-custodial wallet integration
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h12a2 2 0 002-2v6a2 2 0 00-2-2H6a2 2 0 00-2 2v-6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Simple</h3>
            <p className="text-sm text-gray-600">
              Easy QR code or string payments
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Built on Aptos Testnet • Supports APT & USDC</p>
        </footer>
      </div>
    </div>
  );
}
