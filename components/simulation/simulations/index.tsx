import { CreateWalletSimulationKeys } from '../types'
import Airdrop from './solana/create-wallet/Airdrop'
import BackupSeedPhrase from './solana/create-wallet/BackupSeedPhrase'
import GenKeyPair from './solana/create-wallet/GenKeyPair'
import ShowcasePublicKey from './solana/create-wallet/ShowcasePublicKey'

export const RenderSimulation = ({
  simkey,
}: {
  simkey: CreateWalletSimulationKeys
}) => {
  switch (simkey) {
    case CreateWalletSimulationKeys.GenKeyPair:
      return <GenKeyPair />
    case CreateWalletSimulationKeys.BackupSeedPhrase:
      return <BackupSeedPhrase />
    case CreateWalletSimulationKeys.ShowcasePublicKey:
      return <ShowcasePublicKey />
    case CreateWalletSimulationKeys.Airdrop:
      return <Airdrop />
    default:
      return <></>
  }
}
