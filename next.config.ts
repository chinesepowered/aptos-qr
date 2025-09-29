import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Fix for keyv optional dependencies
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@keyv/redis': false,
      '@keyv/mongo': false,
      '@keyv/sqlite': false,
      '@keyv/postgres': false,
      '@keyv/mysql': false,
      '@keyv/etcd': false,
      '@keyv/offline': false,
      '@keyv/tiered': false,
    };
    
    // Ignore dynamic requires in keyv
    config.ignoreWarnings = [
      { module: /node_modules\/keyv/ },
    ];
    
    return config;
  },
  transpilePackages: ['@aptos-labs/wallet-adapter-react'],
};

export default nextConfig;
