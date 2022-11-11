export enum SolanaSimulationKeys {
  GenKeyPair = "genKeyPair",
  BackupSeedPhrase = "backupSeedPhrase",
  ShowcasePublicKey = "showcasePublicKey",
  Airdrop = "airprop",
}

export enum AlgorandSimulationKeys {
  CreateWallet = "createWallet",
}

export enum Blockchains {
  Solana = "solana",
  Algorand = "algorand",
}

export interface CardDataType {
  currentSimulation: SimulationType;
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
export interface BlockType {
  subHeader: string;
  description?: string;
  image?: string;
  list?: ListType[];
}
export interface SimulationType {
  name: string;
  slug: string;
  description?: string;
  renderBlocks: BlockType[];
}

export interface SimulationPageType {
  simulationData: SimulationType[];
  simulationHeader: string;
  blockchain: string;
}
