import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SwapState {
    logo: string;
    networkType: string;
    currentScreen: number;
    amount: number;
    balance: number;
    transaction: number[];
    isLoading: boolean;
    setIsLoading: () => void;
    handleNetworkType: (network: string) => void;
    handleScreen: (screenNumber: number) => void;
    handleAmount: (amount: number) => void;
    handleBalance: (sentAmount: number, balance: number) => void;
    resetTransaction: () => void;
    handleTransaction: (transactionAmount: number, transaction: number[]) => void;
}

export const useSwapStore = create<SwapState>()(
    devtools(
        persist(
            (set, get) => ({
                logo: "",
                networkType: "",
                currentScreen: 0,
                userAddress: "",
                amount: 0,
                balance: 20,
                transaction: [],
                isLoading: false,
                setIsLoading: () => {
                    set({ isLoading: !get().isLoading });
                },
                handleNetworkType: (network: string) =>
                    set({
                        networkType: network,
                        logo:
                            network === "SOL"
                                ? "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
                                : "",
                    }),
                handleScreen: (screenNumber: number) =>
                    set({ currentScreen: screenNumber }),
                handleAmount: (amount: number) => set({ amount: amount }),
                handleBalance: (sentAmount: number, balance: number) =>
                    set({ balance: balance - sentAmount }),
                handleTransaction: (
                    transactionAmount: number,
                    transaction: number[]
                ) => {
                    transaction.push(transactionAmount);
                },
                resetTransaction: () => {
                    set({
                        currentScreen: 0,
                        amount: 0,
                        balance: 20,
                        transaction: [],
                    });
                },
            }),
            {
                name: "sol-transaction-storage",
            }
        )
    )
);
