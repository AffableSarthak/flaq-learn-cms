import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import * as web3 from "@solana/web3.js";
import * as bip39 from "bip39";

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
          const mnemonic = bip39.generateMnemonic();
          set(() => ({ seedPhrase: mnemonic }));
          const publicKey = get().getUserPublicKeyString(mnemonic);
          set(() => ({ publickey: publicKey }));
        },
        getUserPublicKeyString: (mnemonic: string) => {
          const seed = bip39.mnemonicToSeedSync(mnemonic, "");
          const keypair = web3.Keypair.fromSeed(seed.slice(0, 32));
          return keypair.publicKey.toString();
        },
      }),
      {
        name: "eth-wallet-storage",
      }
    )
  )
);
