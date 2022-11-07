import React from 'react'
import { CreateWalletSimulationKeys, CreateWalletState } from '../types'
import Airdrop from './solana/create-wallet/Airdrop'
import BackupSeedPhrase from './solana/create-wallet/BackupSeedPhrase'
import GenKeyPair from './solana/create-wallet/GenKeyPair'
import ShowcasePublicKey from './solana/create-wallet/ShowcasePublicKey'

export const RenderSimulation = ({
  simkey,
}: {
  simkey: CreateWalletSimulationKeys
}) => {
  const [createWalletState, updateCreateWalletState] = React.useState<CreateWalletState>({seedPhrase: "", publicKey: ""});
  switch (simkey) {
    case CreateWalletSimulationKeys.GenKeyPair:
      return <GenKeyPair simState={createWalletState!} updateSimState={updateCreateWalletState} />
    case CreateWalletSimulationKeys.BackupSeedPhrase:
      return <BackupSeedPhrase />
    case CreateWalletSimulationKeys.ShowcasePublicKey:
      return <ShowcasePublicKey simState={createWalletState}/>
    case CreateWalletSimulationKeys.Airdrop:
      return <Airdrop simState={createWalletState}/>
    default:
      return <></>
  }
}
