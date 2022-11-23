import solanaIcon from "../../../public/img/simulations/solana.svg";
import WalletIcon from "../../../public/img/simulations/wallets.svg";
import algorandIcon from "../../../public/img/simulations/algorand.svg";
import ethereumIcon from "../../../public/img/simulations/ethereum.svg";
export const getBlockchainData = () => {
  const data = [
    {
      name: "Solana",
      icon: solanaIcon,
      simulations: [
        {
          name: "Create Wallet",
          link: "solana/create-wallet",
          icon: WalletIcon,
        },
      ],
    },

    {
      name: "Algorand",
      icon: algorandIcon,
      simulations: [
        {
          name: "Create Wallet",
          link: "algorand/create-wallet",
          icon: WalletIcon,
        },
      ],
    },
    {
      name: "Ethereum",
      icon: ethereumIcon,
      simulations: [],
    },
  ];

  return data;
};
