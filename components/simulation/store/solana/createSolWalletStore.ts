import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import * as web3 from "@solana/web3.js";
import * as bip39 from "bip39";

export enum WalltetErrors {
  SolanaInternalError = "There seems to be an internal error with Solana, please try again later.",
}

interface CreateWalletState {
  seedPhrase: string;
  publickey: string;
  setPublicKey: (publickey: string) => void;
  balance: number;
  isLoading: boolean;
  error?: WalltetErrors | undefined;
  fakeBalance: number;
  showPublicKey: boolean;
  setBalance: () => void;
  airdropTokenIntoWallet: () => void;
  setLoader: (isLoading: boolean) => void;
  setError: (error?: WalltetErrors) => void;
  setFakeBalance: () => void;
  resetState: () => void;
  setShowPublicKey: (isSeedPhraseCorrect: boolean) => void;
  generateSeedPhrase: () => void;
  getUserPublicKey: (mnemonic: string) => web3.PublicKey;
  getUserPublicKeyString: (mnemonic: string) => string;
}

export const useCreateSolWalletStore = create<CreateWalletState>()(
  devtools(
    persist(
      (set, get) => ({
        seedPhrase: "",
        balance: 0,
        error: undefined,
        isLoading: false,
        fakeBalance: 0,
        showPublicKey: false,
        publickey: "",
        setPublicKey: (publickey: string) => set({ publickey }),
        setLoader: (isLoading: boolean) => set({ isLoading }),
        setError: (error?: WalltetErrors) => set({ error }),
        setFakeBalance: () => {
          set({ fakeBalance: get().fakeBalance + 1 });
          // get().setError();
        },
        generateSeedPhrase: () => {
          const mnemonic = bip39.generateMnemonic();
          set(() => ({ seedPhrase: mnemonic }));
          const publicKey = get().getUserPublicKeyString(mnemonic);
          set(() => ({ publickey: publicKey }));
          get().resetState();
        },
        setBalance: async () => {
          let connection = new web3.Connection(web3.clusterApiUrl("testnet"));
          const mnemonic = get().seedPhrase;
          let balance = await connection.getBalance(
            get().getUserPublicKey(mnemonic)
          );
          console.log({ balance });
          set({ balance: balance });
        },
        getUserPublicKeyString: (mnemonic: string) => {
          const seed = bip39.mnemonicToSeedSync(mnemonic, "");
          const keypair = web3.Keypair.fromSeed(seed.slice(0, 32));
          return keypair.publicKey.toString();
        },
        getUserPublicKey: (mnemonic: string) => {
          const seed = bip39.mnemonicToSeedSync(mnemonic, "");
          const keypair = web3.Keypair.fromSeed(seed.slice(0, 32));
          return keypair.publicKey;
        },
        airdropTokenIntoWallet: async () => {
          get().setLoader(true);
          let connection = new web3.Connection(web3.clusterApiUrl("devnet"));
          const mnemonic = get().seedPhrase;
          const publicKey = get().getUserPublicKey(mnemonic);
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
        setShowPublicKey: (isSeedPhraseCorrect: boolean) => {
          set({ showPublicKey: isSeedPhraseCorrect });
        },
        resetState: () => {
          set({
            balance: 0,
            error: undefined,
            fakeBalance: 0,
            showPublicKey: false,
          });
        },
      }),
      {
        name: "user-sol-wallet-storage",
      }
    )
  )
);
