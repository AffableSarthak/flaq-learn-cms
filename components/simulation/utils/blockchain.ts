import solanaIcon from "../../../public/img/simulations/solana.svg";
import algorandIcon from "../../../public/img/simulations/algorand.svg";
import ethereumIcon from "../../../public/img/simulations/ethereum.svg";
import filecoinIcon from "../../../public/img/simulations/filecoin.svg";

import walletIcon from "../../../public/img/simulations/wallets.svg";
import nftIcon from "../../../public/img/simulations/nft.svg";
import swapIcon from "../../../public/img/simulations/swap.svg";

export const getBlockchainData = () => {
  const data = [
    {
      name: "Solana",
      icon: solanaIcon,
      simulations: [
        {
          name: "Create Wallet",
          link: "solana/create-wallet",
          icon: walletIcon,
          badgeText: "Basic",
          isActive: true,
        },
        {
          name: "Transfer Cryptocurrencies",
          link: "solana/create-wallet",
          icon: swapIcon,
          badgeText: "Basic",
          isActive: false,
        },
        {
          name: "Mint an NFT",
          link: "solana/create-wallet",
          icon: nftIcon,
          badgeText: "NFT",
          isActive: false,
        },
        {
          name: "Swap your Tokens",
          link: "solana/create-wallet",
          icon: swapIcon,
          badgeText: "DeFi",
          isActive: false,
        },
        {
          name: "Stake and earn yield",
          link: "solana/create-wallet",
          icon: walletIcon,
          badgeText: "DeFi",
          isActive: false,
        },
        {
          name: "Lend and Borrow ",
          link: "solana/create-wallet",
          icon: walletIcon,
          badgeText: "DeFi",
          isActive: false,
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
          icon: walletIcon,
          badgeText: "Basic",
          isActive: true,
        },
        {
          name: "Transfer Cryptocurrencies",
          link: "solana/create-wallet",
          icon: swapIcon,
          badgeText: "Basic",
          isActive: false,
        },
        {
          name: "Mint an NFT",
          link: "solana/create-wallet",
          icon: nftIcon,
          badgeText: "NFT",
          isActive: false,
        },
        {
          name: "Swap your Tokens",
          link: "solana/create-wallet",
          icon: swapIcon,
          badgeText: "DeFi",
          isActive: false,
        },
        {
          name: "Stake and earn yield",
          link: "solana/create-wallet",
          icon: walletIcon,
          badgeText: "DeFi",
          isActive: false,
        },
        {
          name: "Lend and Borrow ",
          link: "solana/create-wallet",
          icon: walletIcon,
          badgeText: "DeFi",
          isActive: false,
        },
      ],
    },
    {
      name: "Ethereum",
      icon: ethereumIcon,
      simulations: [
        {
          name: "Create Wallet",
          link: "algorand/create-wallet",
          icon: walletIcon,
          badgeText: "Basic",
          isActive: true,
        },
        {
          name: "Transfer Cryptocurrencies",
          link: "solana/create-wallet",
          icon: swapIcon,
          badgeText: "Basic",
          isActive: false,
        },
        {
          name: "Mint an NFT",
          link: "solana/create-wallet",
          icon: nftIcon,
          badgeText: "NFT",
          isActive: false,
        },
        {
          name: "Swap your Tokens",
          link: "solana/create-wallet",
          icon: swapIcon,
          badgeText: "DeFi",
          isActive: false,
        },
        {
          name: "Stake and earn yield",
          link: "solana/create-wallet",
          icon: walletIcon,
          badgeText: "DeFi",
          isActive: false,
        },
        {
          name: "Lend and Borrow ",
          link: "solana/create-wallet",
          icon: walletIcon,
          badgeText: "DeFi",
          isActive: false,
        },
      ],
    },
    {
      name: "Filecoin",
      icon: filecoinIcon,
      simulations: [
        {
          name: "Create Wallet",
          link: "algorand/create-wallet",
          icon: walletIcon,
          badgeText: "Basic",
          isActive: true,
        },
        {
          name: "Transfer Cryptocurrencies",
          link: "solana/create-wallet",
          icon: swapIcon,
          badgeText: "Basic",
          isActive: false,
        },
        {
          name: "Mint an NFT",
          link: "solana/create-wallet",
          icon: nftIcon,
          badgeText: "NFT",
          isActive: false,
        },
        {
          name: "Swap your Tokens",
          link: "solana/create-wallet",
          icon: swapIcon,
          badgeText: "DeFi",
          isActive: false,
        },
        {
          name: "Stake and earn yield",
          link: "solana/create-wallet",
          icon: walletIcon,
          badgeText: "DeFi",
          isActive: false,
        },
        {
          name: "Lend and Borrow ",
          link: "solana/create-wallet",
          icon: walletIcon,
          badgeText: "DeFi",
          isActive: false,
        },
      ],
    },
  ];

  return data;
};
