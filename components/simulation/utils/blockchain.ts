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
      paraBlock: [
        {
          textItems: [
            {
              text: "[[Solana]] is a decentralized blockchain created to support globally user-friendly and scalable apps. Read [['The Famous Coins: Bitcoin, Ethereum and Solana']] to learn all about Solana.",
              linkItems: [
                "Solana",
                "'The Famous Coins: Bitcoin, Ethereum and Solana'",
              ],
            },
          ],
        },
      ],
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
          link: "solana/swap-tokens",
          icon: swapIcon,
          badgeText: "DeFi",
          isActive: true,
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
      paraBlock: [
        {
          textItems: [
            {
              text: "[[Algorand]] is a proof-of-stake blockchain cryptocurrency protocol. To equip yourself about what blockchains are, in depth, read '[[The Technology behind Web3 - Blockchain]]'.",
              linkItems: [
                "Algorand",
                "The Technology behind Web3 - Blockchain",
              ],
            },
          ],
        },
      ],
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
          link: "algorand/transfer-crypto",
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
      name: "Ethereum",
      icon: ethereumIcon,
      paraBlock: [
        {
          textItems: [
            {
              text: "[[Ethereum]] is an open-source blockchain that powers the ether (ETH) cryptocurrency along with various other decentralized apps. Read [['The Famous Coins: Bitcoin, Ethereum and Solana']] to learn all about Ethereum.",
              linkItems: [
                "'The Famous Coins: Bitcoin, Ethereum and Solana'",
                "Ethereum",
              ],
            },
          ],
        },
      ],
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
          link: "ethereum/transfer-crypto",
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
      name: "Filecoin",
      icon: filecoinIcon,
      paraBlock: [
        {
          textItems: [
            {
              text: "[[Filecoin]] is an open-source cloud storage marketplace, protocol, and incentive layer. The core Filecoin layer has provided the foundation to build the Filecoin Virtual Machine (FVM). On top of the FVM, we have Native Filecoin Actors and the Filecoin Ethereum Virtual Machine (FEVM) being built.",
              linkItems: ["Filecoin"],
            },
          ],
          image: {
            src: "/wallets/filecoin-arch.png",
            alt: "Filecoin Architecture wallet",
            width: "550",
            height: "195",
          },
        },
      ],
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
          link: "filecoin/transfer-crypto",
          icon: swapIcon,
          badgeText: "Basic",
          isActive: true,
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
