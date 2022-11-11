import React from 'react'
import {
  AlgorandSimulationKeys,
  Blockchains,
  SolanaSimulationKeys,
} from '../types'
import CreateWallet from './algorand/CreateWallet'
import Airdrop from './solana/create-wallet/Airdrop'
import BackupSeedPhrase from './solana/create-wallet/BackupSeedPhrase'
import GenKeyPair from './solana/create-wallet/GenKeyPair'
import ShowcasePublicKey from './solana/create-wallet/ShowcasePublicKey'

export const renderSimulation = (
  simKey: SolanaSimulationKeys | AlgorandSimulationKeys,
  blockchain: string,
) => {
  switch (blockchain) {
    case Blockchains.Solana:
      return renderSolanaSimulation(simKey as SolanaSimulationKeys)

    case Blockchains.Algorand:
      return renderAlgorandSimulation(simKey as AlgorandSimulationKeys)
  }
}

const renderSolanaSimulation = (simkey: SolanaSimulationKeys) => {
  switch (simkey) {
    case SolanaSimulationKeys.GenKeyPair:
      return <GenKeyPair />
    case SolanaSimulationKeys.BackupSeedPhrase:
      return <BackupSeedPhrase />
    case SolanaSimulationKeys.ShowcasePublicKey:
      return <ShowcasePublicKey />
    case SolanaSimulationKeys.Airdrop:
      return <Airdrop />
    default:
      return <></>
  }
}

const renderAlgorandSimulation = (simkey: AlgorandSimulationKeys) => {
  switch (simkey) {
    case AlgorandSimulationKeys.CreateWallet:
      return <CreateWallet />
    default:
      return <></>
  }
}
