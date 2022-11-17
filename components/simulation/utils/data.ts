import {
  SolanaSimulationKeys,
  SimulationBlockType,
  AlgorandSimulationKeys,
} from "../types";

enum SolanaDataType {
  CreateWallet = "create-wallet",
}

enum AlgoranDataType {
  CreateWallet = "create-wallet",
}

/**
 *
 * @returns {SimulationBlockType[]} - Array of Create wallet simulation data
 */
const getSolanaData = (
  simulationType: string
): SimulationBlockType[] | undefined => {
  switch (simulationType) {
    case SolanaDataType.CreateWallet:
      return [
        // 1. Introduction
        {
          title: "Introduction",
          block: [
            {
              paraBlock: [
                {
                  textItems: [
                    {
                      text: "Gm. Please read ‘[[Wallet: Your Crypto Storage]]’ to gain a fundamental understanding of wallets.",
                      linkItems: ["Wallet: Your Crypto Storage"],
                    },
                  ],
                  paraTitle:
                    "Prerequisites before you proceed with the wallet simulation",
                },
                {
                  textItems: [
                    {
                      text: "For doing almost anything in web3 - receiving payments in crypto, sending payments in crypto, swapping tokens, minting NFTs, you need a wallet. While you can have a [[cold wallet]], or a [[hot wallet]], we’ll simulate a hot wallet for you. Once you learn how to create a wallet and get used to the interface as well as the terminologies, it will be a cakewalk for you when you try to create an actual wallet on the Solana chain! 🍰 Take your first step into web3, with Flaq. 🚀",
                      linkItems: ["cold wallet", "hot wallet"],
                    },
                  ],
                  paraTitle: "Creating a wallet is the 1st step to web3",
                },
              ],
            },
          ],
        },
        // 2. Create Wallet
        {
          title: "Create your first wallet ever!",
          block: [
            {
              blockTitle: "What are the elements of creating a wallet?",
              listBlock: [
                {
                  listTitle: "A wallet has 3 primary unavoidable elements",
                  textItems: [
                    {
                      text: "[[seed phrase]] - A unique series of 12 words created by your wallet that lets you access the crypto linked to that wallet. When is this revealed? The creation and verification of a seed phrase is the road to creating your wallet. (don’t share this with anyone, save it somewhere secure! 🔐)",
                      linkItems: ["seed phrase"],
                    },
                    {
                      text: "[[public key]] - a [[cryptographic]] code that enables users to accept crypto into their accounts. Ex - 0x41B...BA34 (a string of numbers and letters 🧵). When is this revealed? After you create your wallet, you can use this public key as your identity! (you can share this! 🔓)",
                      linkItems: ["public key", "cryptographic"],
                    },
                    {
                      text: "[[private key]] - your private key acts as a password that will unlock the transaction. When is this revealed? This is accessible after your wallet is created. (don’t share this with anyone! 🔐)",
                      linkItems: ["private key"],
                    },
                  ],
                },
              ],
            },
          ],
          simKey: SolanaSimulationKeys.GenKeyPair,
        },
        // 3. Backup Seed Phrase
        {
          title: "Backup Seed Phrase, protect funds",
          block: [
            {
              paraBlock: [
                {
                  paraTitle: "Why backing up your seed phrase is necessary? ",
                  textItems: [
                    {
                      text: "You lose your seed phrase, you lose your crypto. Let’s say you created a seed phrase, and trusting your ability to remember things, you do not make a note of it. A few days later, god forbid, you forget your seed phrase. What then? 😔",
                      linkItems: [],
                    },
                    {
                      text: "You have a) lost access to your funds because you can no longer access your wallet, and b) given someone else the golden opportunity to lay their hands on your crypto. If someone else has access to your seed phrase then they can steal all your funds.",
                      linkItems: [],
                    },
                    {
                      text: "So, ALWAYS (and we mean, always) back up your seed phrase. It is quite literally the key to regaining access to your money. 🔑",
                      linkItems: [],
                    },
                  ],
                },
              ],
            },
            {
              listBlock: [
                {
                  listTitle:
                    " I’m convinced. But how do I back up my seed phrase? ",
                  textItems: [
                    {
                      text: "Write it down on a piece of paper and secure it. ",
                      linkItems: [],
                    },
                    {
                      text: "While we don’t recommend saving it online, if you’re confident, you can save it in a secure location on your laptop/phone as well. ",
                      linkItems: [],
                    },
                    {
                      text: "Some people go the extra mile and save it in their bank lockers. ",
                      linkItems: [],
                    },
                  ],
                },
              ],
            },
            {
              paraBlock: [
                {
                  textItems: [
                    {
                      text: "The essence then is that we could have an endless list of ideas on how you can best save your seed phrase. But it’s entirely up to you to be creative and find the safest option that works for you! 🎈 ",
                      linkItems: [],
                    },
                  ],
                },
              ],
            },
          ],
          simKey: SolanaSimulationKeys.BackupSeedPhrase,
        },
        // 4. Verify Public Key
        {
          title: "Final step: Verify your seed phrase ",
          block: [
            {
              listBlock: [
                {
                  listTitle: "Why verify my seed phrase?",
                  textItems: [
                    {
                      text: "we know you’ve backed it up and it is stored somewhere safe. Wallets usually take the first step of your fund protection this way by facilitating the backing up of the seed phrase.",
                      linkItems: [],
                    },
                    {
                      text: " Also, you can confirm that you’ve backed up the right seed phrase. Trust us, those 12 unique words in a series are so unrelated to each other, that it can get confusing while backing them up! 😖 So, verify your seed phrase and complete the final step toward wallet creation! 🥳",
                      linkItems: [],
                    },
                  ],
                },
              ],
            },
          ],
          simKey: SolanaSimulationKeys.ShowcasePublicKey,
        },
        // 5. Airdrop
        {
          title: "Test run your Wallet",
          block: [
            {
              paraBlock: [
                {
                  paraTitle: "Airdrop some SOL to your wallet!",
                  textItems: [
                    {
                      text: "Try to test-run your wallet and see if it works! Airdrop some SOL into your wallet. Note that this entire simulation is on the testnet network, not the mainnet network. This means that on the testnet network, no currency or transaction has any value. It is purely for testing purposes. It is when you transact on the mainnet that there is actual financial value to your transactions. So, test it out on our simulations based on testnet networks and you’ll know if your wallet works! ⬇️",
                      linkItems: [],
                    },
                    {
                      text: "If the airdrop is successful, i.e., if your balance moves from ‘0’ to ‘1 SOL’, then your wallet has successfully been created on the testnet network of the Solana chain. Congratulations! You can now either repeat the process to practice it on the Solana chain itself, choose a different chain to practice this on and get familiar with different interfaces, or go ahead and create your wallet on Solana!",
                      linkItems: [],
                    },
                  ],
                },
              ],
            },
          ],
          simKey: SolanaSimulationKeys.Airdrop,
        },
        // 6. Conclusion
        {
          title: "Conclusion- Where can I make my wallet?",
          block: [
            {
              blockTitle:
                "If you feel ready to make a wallet now, then you can choose from these 3 options -",
              paraBlock: [
                {
                  textItems: [
                    {
                      text: "Phantom, Glow, and Solflare. These are the most sought after wallets on the Solana chain. ",
                      linkItems: [],
                    },
                  ],
                },
              ],
            },
            {
              accordianBlock: [
                {
                  accordianTitle: "Phantom Wallet",
                  accordianPanel: [
                    {
                      paraBlock: [
                        {
                          textItems: [
                            {
                              text: "Phantom is a non-custodial wallet that provides [[Ledger]] support, and biometric authentication and ensures privacy. You can create your [[Phantom wallet]]. This is what your wallet would like on Phantom as soon as you create it - ",
                              linkItems: ["Ledger", "Phantom wallet"],
                            },
                          ],
                          image: {
                            src: "/wallets/Phantom.jpeg",
                            alt: "Phantom wallet",
                            width: "200",
                            height: "400",
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  accordianTitle: "Glow Wallet",
                  accordianPanel: [
                    {
                      paraBlock: [
                        {
                          textItems: [
                            {
                              text: "The Glow wallet lets you swap tokens with zero fees, allows exploration of NFTs, has all activity on one platform, and if you burn spam tokens on Glow, you earn SOL. You can create your [[Glow wallet]]. This is what your wallet would like on Glow as soon as you create it - ",
                              linkItems: ["Glow wallet"],
                            },
                          ],
                          image: {
                            src: "/wallets/Gloiw.jpeg",
                            alt: "Glow wallet",
                            width: "200",
                            height: "400",
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  accordianTitle: "Solflare wallet",
                  accordianPanel: [
                    {
                      paraBlock: [
                        {
                          textItems: [
                            {
                              text: "The Solflare wallet offers transaction simulations, hardware wallet support, and anti-phishing features, and it was the first Solana wallet ever. You can create your [[Solflare wallet]]. This is what your wallet would like on Solflare as soon as you create it - ",
                              linkItems: ["Solflare wallet"],
                            },
                          ],
                          image: {
                            src: "/wallets/Solflare.jpeg",
                            alt: "Solflare wallet",
                            width: "200",
                            height: "400",
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];
    default:
      return undefined;
  }
};

/**
 *
 * @returns {SimulationBlockType[]} - Array of Create wallet simulation data
 */
const getAlgorandData = (
  simulationType: string
): SimulationBlockType[] | undefined => {
  switch (simulationType) {
    case AlgoranDataType.CreateWallet:
      return [
        // 1. Introduction
        {
          title: "Introduction",
          block: [
            {
              paraBlock: [
                {
                  textItems: [
                    {
                      text: "Gm. Please read ‘[[Wallet: Your Crypto Storage]]’ to gain a fundamental understanding of wallets.",
                      linkItems: ["Wallet: Your Crypto Storage"],
                    },
                  ],
                  paraTitle:
                    "Prerequisites before you proceed with the wallet simulation",
                },
                {
                  textItems: [
                    {
                      text: "For doing almost anything in web3 - receiving payments in crypto, sending payments in crypto, swapping tokens, minting NFTs, you need a wallet. While you can have a [[cold wallet]], or a [[hot wallet]], we’ll simulate a hot wallet for you. Once you learn how to create a wallet and get used to the interface as well as the terminologies, it will be a cakewalk for you when you try to create an actual wallet on the Solana chain! 🍰 Take your first step into web3, with Flaq. 🚀",
                      linkItems: ["cold wallet", "hot wallet"],
                    },
                  ],
                  paraTitle: "Creating a wallet is the 1st step to web3",
                },
              ],
            },
          ],
        },
        // 2. Create Wallet
        {
          title: "Create your first wallet ever!",
          block: [
            {
              blockTitle: "What are the elements of creating a wallet?",
              listBlock: [
                {
                  listTitle: "A wallet has 3 primary unavoidable elements",
                  textItems: [
                    {
                      text: "[[seed phrase]] - A unique series of 12 words created by your wallet that lets you access the crypto linked to that wallet. When is this revealed? The creation and verification of a seed phrase is the road to creating your wallet. (don’t share this with anyone, save it somewhere secure! 🔐)",
                      linkItems: ["seed phrase"],
                    },
                    {
                      text: "[[public key]] - a [[cryptographic]] code that enables users to accept crypto into their accounts. Ex - 0x41B...BA34 (a string of numbers and letters 🧵). When is this revealed? After you create your wallet, you can use this public key as your identity! (you can share this! 🔓)",
                      linkItems: ["public key", "cryptographic"],
                    },
                    {
                      text: "[[private key]] - your private key acts as a password that will unlock the transaction. When is this revealed? This is accessible after your wallet is created. (don’t share this with anyone! 🔐)",
                      linkItems: ["private key"],
                    },
                  ],
                },
              ],
            },
          ],
          simKey: AlgorandSimulationKeys.GenAccount,
        },
        // 3. Backup Seed Phrase
        {
          title: "Backup Seed Phrase, protect funds",
          block: [
            {
              paraBlock: [
                {
                  paraTitle: "Why backing up your seed phrase is necessary? ",
                  textItems: [
                    {
                      text: "You lose your seed phrase, you lose your crypto. Let’s say you created a seed phrase, and trusting your ability to remember things, you do not make a note of it. A few days later, god forbid, you forget your seed phrase. What then? 😔",
                      linkItems: [],
                    },
                    {
                      text: "You have a) lost access to your funds because you can no longer access your wallet, and b) given someone else the golden opportunity to lay their hands on your crypto. If someone else has access to your seed phrase then they can steal all your funds.",
                      linkItems: [],
                    },
                    {
                      text: "So, ALWAYS (and we mean, always) back up your seed phrase. It is quite literally the key to regaining access to your money. 🔑",
                      linkItems: [],
                    },
                  ],
                },
              ],
            },
            {
              listBlock: [
                {
                  listTitle:
                    " I’m convinced. But how do I back up my seed phrase? ",
                  textItems: [
                    {
                      text: "Write it down on a piece of paper and secure it. ",
                      linkItems: [],
                    },
                    {
                      text: "While we don’t recommend saving it online, if you’re confident, you can save it in a secure location on your laptop/phone as well. ",
                      linkItems: [],
                    },
                    {
                      text: "Some people go the extra mile and save it in their bank lockers. ",
                      linkItems: [],
                    },
                  ],
                },
              ],
            },
            {
              paraBlock: [
                {
                  textItems: [
                    {
                      text: "The essence then is that we could have an endless list of ideas on how you can best save your seed phrase. But it’s entirely up to you to be creative and find the safest option that works for you! 🎈 ",
                      linkItems: [],
                    },
                  ],
                },
              ],
            },
          ],
          simKey: AlgorandSimulationKeys.BackupSeedPhrase,
        },
        // 4. Verify Public Key
        {
          title: "Final step: Verify your seed phrase ",
          block: [
            {
              listBlock: [
                {
                  listTitle: "Why verify my seed phrase?",
                  textItems: [
                    {
                      text: "we know you’ve backed it up and it is stored somewhere safe. Wallets usually take the first step of your fund protection this way by facilitating the backing up of the seed phrase.",
                      linkItems: [],
                    },
                    {
                      text: " Also, you can confirm that you’ve backed up the right seed phrase. Trust us, those 12 unique words in a series are so unrelated to each other, that it can get confusing while backing them up! 😖 So, verify your seed phrase and complete the final step toward wallet creation! 🥳",
                      linkItems: [],
                    },
                  ],
                },
              ],
            },
          ],
          simKey: AlgorandSimulationKeys.ShowcasePublicKey,
        },
        // 5. Conclusion
        {
          title: "Conclusion- Where can I make my wallet?",
          block: [
            {
              paraBlock: [
                {
                  textItems: [
                    {
                      text: "If you feel ready to make a wallet now, then you can choose from these 3 options - MyAlgo, Pera, and Trust. These are the most-sought after wallets on the Algorand chain. ",
                      linkItems: [],
                    },
                  ],
                },
              ],
            },
            {
              accordianBlock: [
                {
                  accordianTitle: "MyAlgo Wallet",
                  accordianPanel: [
                    {
                      paraBlock: [
                        {
                          textItems: [
                            {
                              text: "MyAlgo is a non-custodial wallet that supports multisig tech and external website integrations. You can create your [[MyAlgo wallet]]. This is what your wallet would like on MyAlgo as soon as you create it -",
                              linkItems: ["MyAlgo wallet"],
                            },
                          ],
                          image: {
                            src: "/wallets/myalgo.jpeg",
                            alt: "MyAlgo wallet",
                            width: "400",
                            height: "200",
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  accordianTitle: "Pera wallet",
                  accordianPanel: [
                    {
                      paraBlock: [
                        {
                          textItems: [
                            {
                              text: "The Pera wallet is secure and decentralized, displays all activity on one platform, supports [[Ledger]], and allows for easy exploration of NFTs as well. You can create your [[Pera wallet]]. This is what your wallet would like on Pera as soon as you create it -",
                              linkItems: ["Legder", "Pera wallet"],
                            },
                          ],
                          image: {
                            src: "/wallets/Pera.jpeg",
                            alt: "Pera wallet",
                            width: "200",
                            height: "400",
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  accordianTitle: "Trust wallet",
                  accordianPanel: [
                    {
                      paraBlock: [
                        {
                          textItems: [
                            {
                              text: "The Trust wallet lets you exchange crypto without leaving the app, track charts and prices, see your collectibles, etc. You can create your [[Trust wallet]] for Algorand. This is what your wallet would like on Trust as soon as you create it -",
                              linkItems: ["Trust wallet"],
                            },
                          ],
                          image: {
                            src: "/wallets/trust.jpeg",
                            alt: "Trust wallet",
                            width: "200",
                            height: "400",
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];
    default:
      return undefined;
  }
};

export const getSimulationData = (
  simulationType: string,
  blockchain: string
): SimulationBlockType[] | undefined => {
  if (blockchain === "solana") {
    return getSolanaData(simulationType);
  } else if (blockchain === "algorand") {
    return getAlgorandData(simulationType);
  }
};
