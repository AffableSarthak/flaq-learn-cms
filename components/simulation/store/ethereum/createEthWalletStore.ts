import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import * as ethers from "ethers";

interface CreateWalletState {
  seedPhrase: string;
  publickey: string;
  setPublicKey: (publickey: string) => void;
  isLoading: boolean;
  setLoader: (isLoading: boolean) => void;
  generateSeedPhrase: () => void;
  getUserPublicKeyString: (mnemonic: string) => string;
}

export const useCreateEthWalletStore = create<CreateWalletState>()(
  devtools(
    persist(
      (set, get) => ({
        seedPhrase: "",
        publickey: "",
        setPublicKey: (publickey: string) => set({ publickey }),
        balance: 0,
        error: undefined,
        isLoading: false,
        fakeBalance: 0,
        showPublicKey: false,
        setLoader: (isLoading: boolean) => set({ isLoading }),
        generateSeedPhrase: () => {
          const wallet = ethers.Wallet.createRandom();
          console.log("privateKey:", wallet.privateKey); // private key
          const mnemonic = wallet.mnemonic.phrase;
          const publickey = wallet.address;
          //   const privateKey = wallet.privateKey
          set(() => ({ seedPhrase: mnemonic }));
          set(() => ({ publickey: publickey }));
        },
        getUserPublicKeyString: (mnemonic: string) => {
          return get().publickey;
        },
      }),
      {
        name: "eth-wallet-storage",
      }
    )
  )
);
