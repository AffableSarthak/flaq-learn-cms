import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import * as web3 from "@solana/web3.js";
import * as bip39 from "bip39";

interface CreateWalletState {
  seedPhrase: string;
  balance: number;
  setSeedPhrase: (seedPhrase: string) => void;
  setBalance: () => void;
  airdropTokenIntoWallet: () => void;
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
        setSeedPhrase: (deets) => set(() => ({ seedPhrase: deets })),
        setBalance: async () => {
          let connection = new web3.Connection(web3.clusterApiUrl("testnet"));
          const mnemonic = get().seedPhrase;
          let balance = await connection.getBalance(getUserPublicKey(mnemonic));
          console.log({ balance });
          set({ balance: balance });
        },
        airdropTokenIntoWallet: async () => {
          let connection = new web3.Connection(web3.clusterApiUrl("testnet"));
          const mnemonic = get().seedPhrase;
          const publicKey = getUserPublicKey(mnemonic);
          const tx = await connection.requestAirdrop(
            publicKey,
            web3.LAMPORTS_PER_SOL
          );
          console.log({ tx });

          // connection.confirmTransaction(tx);
          const latestBlockHash = await connection.getLatestBlockhash();

          const confirmTx = await connection.confirmTransaction({
            blockhash: latestBlockHash.blockhash,
            lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: tx,
          });
          console.log(confirmTx);
          get().setBalance();
        },
      }),
      {
        name: "user-wallet-storage",
      }
    )
  )
);
