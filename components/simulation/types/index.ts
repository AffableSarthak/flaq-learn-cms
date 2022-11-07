export enum CreateWalletSimulationKeys {
  GenKeyPair = "genKeyPair",
  BackupSeedPhrase = "backupSeedPhrase",
  ShowcasePublicKey = "showcasePublicKey",
  Airdrop = "airprop",
}

/**
 * The state for managing the "Create Wallet" Simulation
 */
export interface CreateWalletState {
  publicKey: string;
  seedPhrase: string;
}

export interface UpdateCreateWalletState {
  (state: CreateWalletState): void;
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
  simKey?: CreateWalletSimulationKeys;
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
}
