export enum SolanaSimulationKeys {
  GenKeyPair = "genKeyPair",
  BackupSeedPhrase = "backupSeedPhrase",
  ShowcasePublicKey = "showcasePublicKey",
  Airdrop = "airprop",
}

export enum AlgorandSimulationKeys {
  GenAccount = "genAccount",
  BackupSeedPhrase = "backupSeedPhrase",
  ShowcasePublicKey = "showcasePublicKey",
}

export enum Blockchains {
  Solana = "solana",
  Algorand = "algorand",
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

// Simulation Data
export interface ListType {
  head: string;
  body: BodyType[];
  image?: string;
  simKey?: SolanaSimulationKeys | AlgorandSimulationKeys;
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
  blockchain: string;
}

export interface SimulationBlockType {
  title: string; // main header
  block: BlockType[];
  simKey?: SolanaSimulationKeys | AlgorandSimulationKeys;
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
