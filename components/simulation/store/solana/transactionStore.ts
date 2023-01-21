import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface TransactionState {
    currentScreen: number,
    handleScreen: (screenNumber: number) => void;
}

export const useTransactionStore = create<TransactionState>()(
    devtools(
        persist(
            (set) => ({
                currentScreen: 0,
                handleScreen: (screenNumber: number) => {
                    set({
                        currentScreen: screenNumber
                    })
                },
            }),
            {
                name: "sol-transaction-storage",
            }
        )
    )
);
