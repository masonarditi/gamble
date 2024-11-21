"use client"

import NavigationHeader from './components/NavigationHeader';
import WalletProvider from './components/wallet-provider';
import Gamble from './components/Gamble';

export default function Home() {
  
  return (
    <WalletProvider>
      <div>
        <NavigationHeader />
        <div>
          <div>
            <Gamble />
          </div>
        </div>
      </div>
    </WalletProvider>
  );
}
