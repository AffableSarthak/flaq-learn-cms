import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import * as algosdk from "algosdk";

interface CreateWalletState {
  isLoading: boolean;
  seedPhrase: string;
  publicKey: string;
  showPublicKey: boolean;
  createWallet: () => void;
  setLoader: (isLoading: boolean) => void;
  setShowPublicKey: (isSeedPhraseCorrect: boolean) => void;
}

export const useCreateAlgoWalletStore = create<CreateWalletState>()(
  devtools(
    persist(
      (set, get) => ({
        seedPhrase: "",
        isLoading: false,
        publicKey: "",
        showPublicKey: false,
        setLoader: (isLoading: boolean) => set({ isLoading }),
        createWallet: () => {
          try {
            get().setLoader(true);
            const myaccount = algosdk.generateAccount();
            const publicKey = myaccount.addr;
            const account_mnemonic = algosdk.secretKeyToMnemonic(myaccount.sk);
            set({ publicKey: publicKey });
            set({ seedPhrase: account_mnemonic });
          } catch (err) {
            console.log("err", err);
          } finally {
            get().setLoader(false);
          }
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
