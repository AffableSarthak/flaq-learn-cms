export enum EthereumSimulationKeys {
  GenKeyPair = "genKeyPair",
  BackupSeedPhrase = "backupSeedPhrase",
  ShowcasePublicKey = "showcasePublicKey",
}

export enum FilecoinSimulationKeys {
  GenKeyPair = "genKeyPair",
  BackupSeedPhrase = "backupSeedPhrase",
  ShowcasePublicKey = "showcasePublicKey",
}

export enum SolanaSimulationKeys {
  GenKeyPair = "genKeyPair",
  BackupSeedPhrase = "backupSeedPhrase",
  ShowcasePublicKey = "showcasePublicKey",
  Airdrop = "airprop",
  TransferCypto = "transfercrypto",
}

export enum AlgorandSimulationKeys {
  GenAccount = "genAccount",
  BackupSeedPhrase = "backupSeedPhrase",
  ShowcasePublicKey = "showcasePublicKey",
}

export enum Blockchains {
  Solana = "solana",
  Algorand = "algorand",
  Ethereum = "ethereum",
  Filecoin = "filecoin",
}

export interface CardDataType {
  currentSimulation: SimulationBlockType;
  isBackDisabled: boolean;
  isNextDisabled: boolean;
  currentSimulationIndex: number;
}

export interface BodyType {
  paragraph?: string;
  pointHeader?: string;
  points?: string[];
  image?: string;
}

export interface ListType {
  head: string;
  body: BodyType[];
  image?: string;
  simKey?:
    | SolanaSimulationKeys
    | AlgorandSimulationKeys
    | EthereumSimulationKeys
    | FilecoinSimulationKeys;
}

export interface SimulationType {
  name: string;
  slug: string;
  description?: string;
  renderBlocks: BlockType[];
}

export interface SimulationPageType {
  simulationData: SimulationBlockType[];
  simulationHeader: string;
  blockchain: Blockchains;
}

export interface SimulationBlockType {
  title: string; // main header
  block: BlockType[];
  simKey?:
    | SolanaSimulationKeys
    | AlgorandSimulationKeys
    | EthereumSimulationKeys
    | FilecoinSimulationKeys;
}

export interface BlockType {
  blockTitle?: string; // Subheader
  paraBlock?: ParaBlockType[];
  listBlock?: ListBlockType[];
  accordianBlock?: AccordianBlockType[];
}

export interface TextType {
  text: string;
  linkItems: string[];
}

export interface ImageType {
  src: string;
  alt: string;
  height: string;
  width: string;
}
export interface ParaBlockType {
  textItems: TextType[];
  paraTitle?: string; // Block header
  image?: ImageType;
}

export interface ListBlockType {
  textItems: TextType[];
  listTitle: string; // Block header
}

export interface AccordianBlockType {
  accordianTitle: string; // Block header
  accordianPanel: BlockType[];
}
