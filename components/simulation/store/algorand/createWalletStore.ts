import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CreateWalletState {
  isLoading: boolean;
  seedPhrase: string;
  publicKey: string;
  showPublicKey: boolean;
  setSeedPhrase: (seedPhrase: string) => void;
  setPublicKey: (publicKey: string) => void;
  setLoader: (isLoading: boolean) => void;
  setShowPublicKey: (isSeedPhraseCorrect: boolean) => void;
}

export const useCreateWalletStore = create<CreateWalletState>()(
  devtools(
    persist(
      (set, get) => ({
        seedPhrase: "",
        isLoading: false,
        publicKey: "",
        showPublicKey: false,
        setLoader: (isLoading: boolean) => set({ isLoading }),
        setSeedPhrase: (deets) => {
          set(() => ({ seedPhrase: deets }));
        },
        setPublicKey: (deets) => {
          set(() => ({ publicKey: deets }));
        },
        setShowPublicKey: (isSeedPhraseCorrect: boolean) => {
          set({ showPublicKey: isSeedPhraseCorrect });
        },
      }),
      {
        name: "algorand-wallet-storage",
      }
    )
  )
);
