import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import * as web3 from "@solana/web3.js";
import * as bip39 from "bip39";

enum WalltetErrors {
  SolanaInternalError = "There seems to be an internal error with Solana, please try again later.",
}

interface CreateWalletState {
  seedPhrase: string;
  balance: number;
  isLoading: boolean;
  error?: WalltetErrors;
  fakeBalance: number;
  setSeedPhrase: (seedPhrase: string) => void;
  setBalance: () => void;
  airdropTokenIntoWallet: () => void;
  setLoader: (isLoading: boolean) => void;
  setError: (error?: WalltetErrors) => void;
  setFakeBalance: () => void;
  resetState: () => void;
}

// utils
export const getUserPublicKey = (mnemonic: string) => {
  const seed = bip39.mnemonicToSeedSync(mnemonic, "");
  const keypair = web3.Keypair.fromSeed(seed.slice(0, 32));
  return keypair.publicKey;
};

export const useCreateWalletStore = create<CreateWalletState>()(
  devtools(
    persist(
      (set, get) => ({
        seedPhrase: "",
        balance: 0,
        error: undefined,
        isLoading: false,
        fakeBalance: 0,
        setLoader: (isLoading: boolean) => set({ isLoading }),
        setError: (error?: WalltetErrors) => set({ error }),
        setFakeBalance: () => {
          set({ fakeBalance: get().fakeBalance + 1 });
          // get().setError();
        },
        setSeedPhrase: (deets) => {
          set(() => ({ seedPhrase: deets }));
          get().resetState();
        },
        setBalance: async () => {
          let connection = new web3.Connection(web3.clusterApiUrl("testnet"));
          const mnemonic = get().seedPhrase;
          let balance = await connection.getBalance(getUserPublicKey(mnemonic));
          console.log({ balance });
          set({ balance: balance });
        },
        airdropTokenIntoWallet: async () => {
          get().setLoader(true);
          let connection = new web3.Connection(web3.clusterApiUrl("devnet"));
          const mnemonic = get().seedPhrase;
          const publicKey = getUserPublicKey(mnemonic);
          try {
            const tx = await connection.requestAirdrop(
              publicKey,
              web3.LAMPORTS_PER_SOL
            );
            const latestBlockHash = await connection.getLatestBlockhash();

            const confirmTx = await connection.confirmTransaction({
              blockhash: latestBlockHash.blockhash,
              lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
              signature: tx,
            });

            console.log(confirmTx);
          } catch (error) {
            console.log(error);
          } finally {
            get().setBalance();
            get().setFakeBalance();
            get().setLoader(false);
          }
        },
        resetState: () => {
          set({ balance: 0, error: undefined, fakeBalance: 0 });
        },
      }),
      {
        name: "user-wallet-storage",
      }
    )
  )
);
