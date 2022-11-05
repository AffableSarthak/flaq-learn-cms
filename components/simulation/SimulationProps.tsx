export enum SimKey {
  GenKeyPair = 'genKeyPair',
  BackupSeedPhrase = 'backupSeedPhrase',
  ShowcasePublicKey = 'showcasePublicKey',
  Airdrop = 'airprop',
}
export interface ListType {
  head: string
  body: string
  image?: string
  simKey?: SimKey
}
export interface Block {
  subHeader: string
  description?: string
  image?: string
  list?: ListType[]
}
interface simulationProps {
  name: string
  slug: string
  description?: string
  renderBlocks: Block[]
}

export type { simulationProps }
