import solanaIcon from "../../../public/img/simulations/solana.svg";
import algorandIcon from "../../../public/img/simulations/algorand.svg";
import ethereumIcon from "../../../public/img/simulations/ethereum.svg";
import filecoinIcon from "../../../public/img/simulations/filecoin.svg";

import walletIcon from "../../../public/img/simulations/wallets.svg";
import nftIcon from "../../../public/img/simulations/nft.svg";
import swapIcon from "../../../public/img/simulations/swap.svg";
import stakingIcon from "../../../public/img/simulations/staking.png";
import lendingIcon from "../../../public/img/simulations/lending.png";

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
          link: "solana/transfer-crypto",
          icon: swapIcon,
          badgeText: "Basic",
          isActive: true,
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
          icon: stakingIcon,
          badgeText: "DeFi",
          isActive: false,
        },
        {
          name: "Lend and Borrow ",
          link: "solana/create-wallet",
          icon: lendingIcon,
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
          icon: stakingIcon,
          badgeText: "DeFi",
          isActive: false,
        },
        {
          name: "Lend and Borrow ",
          link: "solana/create-wallet",
          icon: lendingIcon,
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
          link: "ethereum/create-wallet",
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
          icon: stakingIcon,
          badgeText: "DeFi",
          isActive: false,
        },
        {
          name: "Lend and Borrow ",
          link: "solana/create-wallet",
          icon: lendingIcon,
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
          name: "Create Fil Wallet",
          link: "filecoin/create-wallet",
          icon: walletIcon,
          badgeText: "Basic",
          isActive: true,
        },
        {
          name: "Transfer Fil to addresses",
          link: "solana/create-wallet",
          icon: swapIcon,
          badgeText: "Basic",
          isActive: false,
        },

        {
          name: "Web3 storage",
          link: "solana/create-wallet",
          icon: stakingIcon,
          badgeText: "DeFi",
          isActive: false,
        },
      ],
    },
  ];

  return data;
};
