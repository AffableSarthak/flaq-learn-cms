import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserWalletDetails {
  seedPhrase: string;
  publicKey: string;
}

interface CreateWalletState {
  userWalletDetails: UserWalletDetails;
  setUserWalletDetails: (userWalletDetails: UserWalletDetails) => void;
}

export const useCreateWalletStore = create<CreateWalletState>()(
  devtools(
    persist(
      (set) => ({
        userWalletDetails: {
          seedPhrase: "",
          publicKey: "",
        },
        setUserWalletDetails: (deets) =>
          set((state) => ({ userWalletDetails: deets })),
      }),
      {
        name: "user-wallet-storage",
      }
    )
  )
);
