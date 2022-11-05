import React from 'react'
import SimulationCard from '../../../components/simulation/SimulationCard'
import SimulationLayout from '../../../components/simulation/SimulationLayout'
import {
  SimKey,
  simulationProps,
} from '../../../components/simulation/SimulationProps'

type Props = {
  simulationHeader: string
  simulationData: simulationProps[]
  currentSimulation: simulationProps
}

const WalletCreation = ({
  simulationData,
  currentSimulation,
  simulationHeader,
}: Props) => {
  return (
    <SimulationLayout simulationData={simulationData}>
      <SimulationCard
        currentSimulation={currentSimulation}
        simulationHeader={simulationHeader}
      />
    </SimulationLayout>
  )
}

export async function getServerSideProps(context: any) {
  const slug = context.query.slug

  const simulationData: simulationProps[] = [
    {
      name: 'Introduction',
      slug: 'introduction',
      renderBlocks: [
        {
          subHeader: 'Introduction',
          list: [
            {
              head:
                'What are emulations - why is this the future of web3 education?',
              body: 'Create a wallet',
            },
            {
              head: 'What will you be learning to emulate?',
              body: 'Create a wallet',
            },
            {
              head: 'Why should you care about creating a wallet? ',
              body: 'Create a wallet',
            },
          ],
        },
      ],
    },
    {
      name: 'Create a wallet',
      slug: 'create-a-wallet',
      renderBlocks: [
        {
          subHeader: 'Create your first wallet ever!',
          list: [
            {
              head:
                'What is a Mnemonic Phrase? Why is it important to keep it safe?',
              body: 'Create a wallet',
            },
            {
              head: 'What are seed phrases?',
              body: 'Create a wallet',
            },
            {
              head: 'Let’s generate a keypair!',
              body: 'Create a wallet',
              simKey: SimKey.GenKeyPair,
            },
          ],
        },
      ],
    },
    {
      name: 'Backup Seed Phrase',
      slug: 'backup-seed-phrase',
      renderBlocks: [
        {
          subHeader: 'Backup your Seed Phrase 🤫',
          list: [
            {
              head:
                'What is this? Why do I have to back it up? What happens if I lose it?',
              body: 'Create a wallet',
            },
            {
              head: "Let's back it up!",
              body: 'Create a wallet',
              simKey: SimKey.BackupSeedPhrase,
            },
          ],
        },
      ],
    },
    {
      name: 'Showcase the Public Key',
      slug: 'showcase-the-public-key',
      renderBlocks: [
        {
          subHeader: 'Go “Public” in Web3',
          list: [
            {
              head: 'What is Public Key?',
              body:
                'A cryptographic key that can be obtained and used by anyone to encrypt messages intended for a particular recipient, such that the encrypted messages can be deciphered only by using a second key that is known only to the recipient (the private key ).',
              image: 'https://media.giphy.com/media/1xrbiAultrDDq/giphy.gif',
            },
            {
              head: 'Behold, your Public Key! 🎉',
              body: 'Create a wallet',
              simKey: SimKey.ShowcasePublicKey,
            },
          ],
        },
      ],
    },
    {
      name: 'Request for testnet airdrop on for the wallet',
      slug: 'request-for-testnet-airdrop-on-for-the-wallet',
      renderBlocks: [
        {
          subHeader: 'Request for testnet airdrop on for the wallet',
          list: [
            {
              head: 'I made a wallet, now what? 🤔',
              body:
                'Web3 Wallets have set a new industry standard in creating new ways to own and monetize our content, identity, and assets as we move on towards the next generation of the internet. Simply put, Web3 wallets are a way to use hardware or software not only to access funds, but to effortlessly allow you to interact with decentralized applications, serve as a gateway to bankless financial services, collect NFTs, create on-chain identity, collaborate with communities, and provide substantially more use cases beyond the scope of the traditional wallets we have today. Just like how people have a physical wallet to store paper money, these wallets help store access to your digital currency instead. In addition, Web3 wallets are capable of storing digital assets such as NFTs and enable users to interact with Decentralized Apps (dApps). This is done all without the necessity of a middleman involved. Wallets don’t actually store the cryptocurrency, but they store the information required for access to your funds which are digital cryptocurrencies.',
            },
            {
              head: 'What is an Airdrop?',
              body:
                'Web3 Wallets have set a new industry standard in creating new ways to own and monetize our content, identity, and assets as we move on towards the next generation of the internet. Simply put, Web3 wallets are a way to use hardware or software not only to access funds, but to effortlessly allow you to interact with decentralized applications, serve as a gateway to bankless financial services, collect NFTs, create on-chain identity, collaborate with communities, and provide substantially more use cases beyond the scope of the traditional wallets we have today. Just like how people have a physical wallet to store paper money, these wallets help store access to your digital currency instead. In addition, Web3 wallets are capable of storing digital assets such as NFTs and enable users to interact with Decentralized Apps (dApps). This is done all without the necessity of a middleman involved. Wallets don’t actually store the cryptocurrency, but they store the information required for access to your funds which are digital cryptocurrencies.',

              image: 'https://media.giphy.com/media/12QCczVAjPAfvi/giphy.gif',
            },
            {
              head: 'What Different the networks (testnet?? 😵‍💫)',
              body:
                'Web3 Wallets have set a new industry standard in creating new ways to own and monetize our content, identity, and assets as we move on towards the next generation of the internet. Simply put, Web3 wallets are a way to use hardware or software not only to access funds, but to effortlessly allow you to interact with decentralized applications, serve as a gateway to bankless financial services, collect NFTs, create on-chain identity, collaborate with communities, and provide substantially more use cases beyond the scope of the traditional wallets we have today. Just like how people have a physical wallet to store paper money, these wallets help store access to your digital currency instead. In addition, Web3 wallets are capable of storing digital assets such as NFTs and enable users to interact with Decentralized Apps (dApps). This is done all without the necessity of a middleman involved. Wallets don’t actually store the cryptocurrency, but they store the information required for access to your funds which are digital cryptocurrencies.',
            },
            {
              head: 'Check your balance! 💸',
              body:
                'Web3 Wallets have set a new industry standard in creating new ways to own and monetize our content, identity, and assets as we move on towards the next generation of the internet. Simply put, Web3 wallets are a way to use hardware or software not only to access funds, but to effortlessly allow you to interact with decentralized applications, serve as a gateway to bankless financial services, collect NFTs, create on-chain identity, collaborate with communities, and provide substantially more use cases beyond the scope of the traditional wallets we have today. Just like how people have a physical wallet to store paper money, these wallets help store access to your digital currency instead. In addition, Web3 wallets are capable of storing digital assets such as NFTs and enable users to interact with Decentralized Apps (dApps). This is done all without the necessity of a middleman involved. Wallets don’t actually store the cryptocurrency, but they store the information required for access to your funds which are digital cryptocurrencies.',

              simKey: SimKey.Airdrop,
            },
          ],
        },
      ],
    },
  ]

  const simulation = simulationData.find((item) => item.slug === slug)
  return {
    props: {
      simulationData: simulationData,
      currentSimulation: simulation ? simulation : simulationData[0],
      simulationHeader: 'Wallet Creation',
    },
  }
}

export default WalletCreation
