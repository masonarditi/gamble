'use client'

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  base,
  baseSepolia,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
    appName: 'Gamble',
    projectId: '4fb0557863f2531efa49874a6ab539f7',
    chains: [base, baseSepolia],
    ssr: true, 
  });

  const queryClient = new QueryClient();
  export default function WalletProvider({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();
  
    return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
            coolMode
            showRecentTransactions={true}
          >
            {children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );
  }