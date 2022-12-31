import React from "react";
import {
  AlgorandSimulationKeys,
  Blockchains,
  EthereumSimulationKeys,
  SolanaSimulationKeys,
} from "../types";
import Airdrop from "./solana/Airdrop";
import BackupSeedPhrase from "./common/create-wallet/BackupSeedPhrase";
import ShowcasePublicKey from "./common/create-wallet/ShowcasePublicKey";
import GenKeyPair from "./common/create-wallet/GenKeyPair";
import { useCreateSolWalletStore } from "../store/solana/createSolWalletStore";
import shallow from "zustand/shallow";
import { useCreateEthWalletStore } from "../store/ethereum/createEthWalletStore";
import { useCreateAlgoWalletStore } from "../store/algorand/createAlgoWalletStore";

export interface SimulationProps {
  simKey:
    | SolanaSimulationKeys
    | AlgorandSimulationKeys
    | EthereumSimulationKeys;
  blockchain: Blockchains;
}

const RenderSimulation = (props: SimulationProps) => {
  const { simKey, blockchain } = props;

  switch (blockchain) {
    case Blockchains.Solana:
      return renderSolanaSimulation(simKey as SolanaSimulationKeys);

    case Blockchains.Algorand:
      return renderAlgorandSimulation(simKey as AlgorandSimulationKeys);

    case Blockchains.Ethereum:
      return renderEthereumSimulation(simKey as EthereumSimulationKeys);
  }
};

const renderSolanaSimulation = (simkey: SolanaSimulationKeys) => {
  const { seedPhrase, generateKey, publicKey } = useCreateSolWalletStore(
    (state) => ({
      seedPhrase: state.seedPhrase,
      generateKey: state.generateSeedPhrase,
      publicKey: state.publickey,
    }),
    shallow
  );

  switch (simkey) {
    case SolanaSimulationKeys.GenKeyPair:
      return <GenKeyPair seedPhrase={seedPhrase} generateKey={generateKey} />;
    case SolanaSimulationKeys.BackupSeedPhrase:
      return <BackupSeedPhrase seedPhrase={seedPhrase} />;
    case SolanaSimulationKeys.ShowcasePublicKey:
      return (
        <ShowcasePublicKey publicKey={publicKey} seedPhrase={seedPhrase} />
      );
    case SolanaSimulationKeys.Airdrop:
      return <Airdrop />;
    default:
      return <></>;
  }
};

const renderAlgorandSimulation = (simkey: AlgorandSimulationKeys) => {
  const { seedPhrase, publicKey, createWallet, isLoading } =
    useCreateAlgoWalletStore(
      (state) => ({
        seedPhrase: state.seedPhrase,
        publicKey: state.publicKey,
        createWallet: state.createWallet,
        isLoading: state.isLoading,
      }),
      shallow
    );

  switch (simkey) {
    case AlgorandSimulationKeys.GenAccount:
      return <GenKeyPair seedPhrase={seedPhrase} generateKey={createWallet} />;
    case AlgorandSimulationKeys.BackupSeedPhrase:
      return <BackupSeedPhrase seedPhrase={seedPhrase} />;
    case AlgorandSimulationKeys.ShowcasePublicKey:
      return (
        <ShowcasePublicKey publicKey={publicKey} seedPhrase={seedPhrase} />
      );
    default:
      return <></>;
  }
};

const renderEthereumSimulation = (simkey: EthereumSimulationKeys) => {
  const { seedPhrase, generateKey, publicKey } = useCreateEthWalletStore(
    (state) => ({
      seedPhrase: state.seedPhrase,
      generateKey: state.generateSeedPhrase,
      publicKey: state.publickey,
    }),
    shallow
  );

  switch (simkey) {
    case EthereumSimulationKeys.GenKeyPair: {
      return <GenKeyPair seedPhrase={seedPhrase} generateKey={generateKey} />;
    }
    case EthereumSimulationKeys.BackupSeedPhrase: {
      return <BackupSeedPhrase seedPhrase={seedPhrase} />;
    }
    case EthereumSimulationKeys.ShowcasePublicKey: {
      return (
        <ShowcasePublicKey publicKey={publicKey} seedPhrase={seedPhrase} />
      );
    }
    default:
      return <></>;
  }
};

export default RenderSimulation;
