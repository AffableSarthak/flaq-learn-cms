import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { NetworkType } from "./transactionStore";

export interface TokenState {
  name: string;
  symbol: string;
  multiplier: number;
  icon: string;
}

export interface SwapHistory {
  tokName: string;
  swapValue: number;
}

export type SlippageValues = 0.1 | 0.5 | 1.5;
interface SwapTokenState {
  networkMetadata: {
    bgColor: string;
    icon: string;
    sampleAddress: string;
    tokenList: TokenState[];
    networkFee: number;
    swapFromToken: TokenState | undefined;
  };

  networkType: NetworkType;
  currentScreen: number;
  balance: number;
  isLoading: boolean;
  setIsLoading: () => void;
  handleNetworkType: (network: NetworkType) => void;
  handleScreen: (screenNumber: number) => void;
  handleBalance: (balance: number) => void;
  resetState: () => void;

  swapFromVal: number;
  swapToVal: number;
  swapHistory: SwapHistory[];
  slippageOptions: number[];
  slippage: SlippageValues;
  finalSwapVal: number;
  selectedSwapTo: TokenState;

  setSwapFromVal: (swapFromVal: number) => void;
  setSwapToVal: (swapToVal: number) => void;
  setSwapHistory: (swapHistory: SwapHistory) => void;
  setSlippage: (slippage: SlippageValues) => void;
  setFinalSwapVal: (finalSwapVal: number) => void;
  setSelectedSwapTo: (token: TokenState) => void;
}

export const useSwapTokenStore = create<SwapTokenState>()(
  devtools(
    persist(
      (set, get) => ({
        networkMetadata: {
          bgColor: "",
          icon: "",
          sampleAddress: "",
          tokenList: [],
          networkFee: 0,
          swapFromToken: undefined,
        },
        selectedSwapTo: {
          icon: "",
          name: "",
          symbol: "",
          multiplier: 0,
        },
        setSelectedSwapTo: (token: TokenState) =>
          set({ selectedSwapTo: token }),
        networkType: undefined,
        currentScreen: 0,
        balance: 100,
        slippageOptions: [0.1, 0.5, 1.5],
        slippage: 0.1,
        swapFromVal: 0,
        swapToVal: 0,
        swapHistory: [],
        finalSwapVal: 0,
        isLoading: false,
        setIsLoading: () => {
          set({ isLoading: !get().isLoading });
        },
        setSwapFromVal: (swapFromVal: number) => set({ swapFromVal }),
        setSwapToVal: (swapToVal: number) => set({ swapToVal }),
        setSwapHistory: (swapHistory: SwapHistory) => {
          let currentSwapHistory = get().swapHistory;
          const updatedSwapHistory = [...currentSwapHistory, swapHistory];
          set({
            swapHistory: updatedSwapHistory,
          });
        },
        setSlippage: (slippage: SlippageValues) => set({ slippage }),
        setFinalSwapVal: (finalSwapVal: number) => set({ finalSwapVal }),
        handleNetworkType: (network: NetworkType) => {
          set({ networkType: network });
          if (network === "SOL") {
            set({
              networkMetadata: {
                bgColor:
                  "linear-gradient(229.14deg, #94F533 -2.89%, #2AD0CA 84.74%)",
                icon: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png",

                sampleAddress: "XDmnCM4twTHNVykAfkMkdhwon9BEGTQ9gRpciq12ka1e",
                tokenList: [
                  {
                    icon: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png",
                    name: "Solana",
                    multiplier: 0.18,
                    symbol: "SOL",
                  },
                  {
                    icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png",
                    name: "Chainlink",
                    multiplier: 0.06,
                    symbol: "LINK",
                  },
                  {
                    icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/6719.png",
                    name: "The Graph",
                    symbol: "GRT",
                    multiplier: 1.1,
                  },
                  {
                    icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/18069.png",
                    name: "STEPN",
                    symbol: "GMT",
                    multiplier: 2,
                  },
                ],
                swapFromToken: {
                  icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
                  name: "Tether",
                  multiplier: 1,
                  symbol: "USDT",
                },
                networkFee: 0,
              },
            });
          }
          if (network === "ALGO") {
            set({
              networkMetadata: {
                bgColor:
                  "linear-gradient(229.14deg, #94F533 -2.89%, #2AD0CA 84.74%)",

                icon: "https://s2.coinmarketcap.com/static/img/coins/200x200/4030.png",

                sampleAddress:
                  "HXTXBE5LQLMVIWDAJ5PCCFU44TJKK7CIPQKQNOVNJJ5PCCFU44KZVLBBUV",
                tokenList: [],
                swapFromToken: {
                  icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
                  name: "Tether",
                  multiplier: 1,
                  symbol: "USDT",
                },
                networkFee: 0,
              },
            });
          }
          if (network === "ETH") {
            set({
              networkMetadata: {
                bgColor:
                  "linear-gradient(229.14deg, #94F533 -2.89%, #2AD0CA 84.74%)",
                icon: "https://e7.pngegg.com/pngimages/505/627/png-clipart-ethereum-bitcoin-cryptocurrency-logo-litecoin-bitcoin-angle-triangle-thumbnail.png",

                sampleAddress: "0xb314b59355D292A6bADd1aACc6a2253b5936c857",
                tokenList: [],
                swapFromToken: {
                  icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
                  name: "Tether",
                  multiplier: 1,
                  symbol: "USDT",
                },
                networkFee: 0,
              },
            });
          }
          if (network === "FIL") {
            set({
              networkMetadata: {
                bgColor:
                  "linear-gradient(229.14deg, #94F533 -2.89%, #2AD0CA 84.74%)",
                icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Filecoin.svg/1200px-Filecoin.svg.png",

                sampleAddress: "f4337wsswt47byin3yidtx6nknpg10f5iiatzw3bf5pn",
                tokenList: [],
                swapFromToken: {
                  icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
                  name: "Tether",
                  multiplier: 1,
                  symbol: "USDT",
                },
                networkFee: 0,
              },
            });
          }
        },
        handleScreen: (screenNumber: number) =>
          set({ currentScreen: screenNumber }),

        handleBalance: (balance: number) => set({ balance: balance }),

        resetState: () => {
          set({
            currentScreen: 0,
            balance: 100,
            slippage: 0.1,
            swapFromVal: 0,
            swapToVal: 0,
            swapHistory: [],
            finalSwapVal: 0,
          });
        },
      }),
      {
        name: "swap-token-storage",
      }
    )
  )
);
