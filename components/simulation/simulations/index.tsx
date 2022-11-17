import React from 'react'
import {
  AlgorandSimulationKeys,
  Blockchains,
  SolanaSimulationKeys,
} from '../types'
import BackupSeed from './algorand/create-wallet/BackupSeed'
import GenerateAccount from './algorand/create-wallet/GenerateAccount'
import ShowcasePubKey from './algorand/create-wallet/ShowcasePubKey'
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
    case AlgorandSimulationKeys.GenAccount:
      return <GenerateAccount />
    case AlgorandSimulationKeys.BackupSeedPhrase:
      return <BackupSeed />
    case AlgorandSimulationKeys.ShowcasePublicKey:
      return <ShowcasePubKey />
    default:
      return <></>
  }
}
