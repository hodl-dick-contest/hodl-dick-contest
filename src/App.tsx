import { BrowserRouter, Route, Routes } from "react-router-dom";

import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";

import { getDefaultWallets, RainbowKitProvider, midnightTheme } from "@rainbow-me/rainbowkit";
import { PageHome } from "./pages/pageHome";
import { PageContest } from "./pages/pageContest";

import "@rainbow-me/rainbowkit/styles.css";


const { chains, provider } = configureChains(
  [
    chain.polygon,     
  ],
  [
    alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_API_KEY }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: "HodlDickContest",
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

function App() {
  return (
    <div className="App">
        <WagmiConfig client={ wagmiClient }>
          <RainbowKitProvider chains={ chains } theme={ midnightTheme() }>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={ <PageHome/> } />
                <Route path="/contest/:contractAddress" element={ <PageContest/> } />
              </Routes>
            </BrowserRouter>            
          </RainbowKitProvider>
        </WagmiConfig>
    </div>
  );
}

export default App;
