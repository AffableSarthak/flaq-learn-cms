import React from "react";
import {
  AlgorandSimulationKeys,
  Blockchains,
  EthereumSimulationKeys,
  FilecoinSimulationKeys,
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
import Transaction from "./common/transaction";
import { useCreateFilWalletStore } from "../store/filecoin/createFilWalletStore";
import SwapTokens from "./common/swap-token";

export interface SimulationProps {
  simKey:
    | SolanaSimulationKeys
    | AlgorandSimulationKeys
    | EthereumSimulationKeys
    | FilecoinSimulationKeys;
  blockchain: Blockchains;
}

const RenderSimulation = (props: SimulationProps) => {
  const { simKey, blockchain } = props;

  switch (blockchain) {
    case Blockchains.Solana:
      return <RenderSolanaSimulation simKey={simKey as SolanaSimulationKeys} />;

    case Blockchains.Algorand:
      return (
        <RenderAlgorandSimulation simKey={simKey as AlgorandSimulationKeys} />
      );

    case Blockchains.Ethereum:
      return (
        <RenderEthereumSimulation simKey={simKey as EthereumSimulationKeys} />
      );

    case Blockchains.Filecoin:
      return (
        <RenderFilecoinSimulation simKey={simKey as FilecoinSimulationKeys} />
      );

    default:
      return <></>;
  }
};

const RenderSolanaSimulation = ({
  simKey,
}: {
  simKey: SolanaSimulationKeys;
}) => {
  const { seedPhrase, generateKey, publicKey } = useCreateSolWalletStore(
    (state) => ({
      seedPhrase: state.seedPhrase,
      generateKey: state.generateSeedPhrase,
      publicKey: state.publickey,
    }),
    shallow
  );

  switch (simKey) {
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
    case SolanaSimulationKeys.TransferCypto:
      return <Transaction network={"SOL"} />;
    case SolanaSimulationKeys.SwapTokens:
      return <SwapTokens network={"SOL"} />;
    default:
      return <></>;
  }
};

const RenderAlgorandSimulation = ({
  simKey,
}: {
  simKey: AlgorandSimulationKeys;
}) => {
  const {
    seedPhrase,
    publicKey,
    createWallet,
    isLoading,
  } = useCreateAlgoWalletStore(
    (state) => ({
      seedPhrase: state.seedPhrase,
      publicKey: state.publicKey,
      createWallet: state.createWallet,
      isLoading: state.isLoading,
    }),
    shallow
  );

  switch (simKey) {
    case AlgorandSimulationKeys.GenAccount:
      return <GenKeyPair seedPhrase={seedPhrase} generateKey={createWallet} />;
    case AlgorandSimulationKeys.BackupSeedPhrase:
      return <BackupSeedPhrase seedPhrase={seedPhrase} />;
    case AlgorandSimulationKeys.ShowcasePublicKey:
      return (
        <ShowcasePublicKey publicKey={publicKey} seedPhrase={seedPhrase} />
      );
    case AlgorandSimulationKeys.TransferCypto:
      return <Transaction network={"ALGO"} />;
    default:
      return <></>;
  }
};

const RenderEthereumSimulation = ({
  simKey,
}: {
  simKey: EthereumSimulationKeys;
}) => {
  const { seedPhrase, generateKey, publicKey } = useCreateEthWalletStore(
    (state) => ({
      seedPhrase: state.seedPhrase,
      generateKey: state.generateSeedPhrase,
      publicKey: state.publickey,
    }),
    shallow
  );

  switch (simKey) {
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
    case EthereumSimulationKeys.TransferCypto:
      return <Transaction network={"ETH"} />;
    default:
      return <></>;
  }
};

const RenderFilecoinSimulation = ({
  simKey,
}: {
  simKey: FilecoinSimulationKeys;
}) => {
  const {
    seedPhrase,
    generateKey,
    publicKey,
    f4Address,
  } = useCreateFilWalletStore(
    (state) => ({
      seedPhrase: state.seedPhrase,
      generateKey: state.generateSeedPhrase,
      publicKey: state.publickey,
      f4Address: state.f4Adrress,
    }),
    shallow
  );

  switch (simKey) {
    case FilecoinSimulationKeys.GenKeyPair: {
      return <GenKeyPair seedPhrase={seedPhrase} generateKey={generateKey} />;
    }
    case FilecoinSimulationKeys.BackupSeedPhrase: {
      return <BackupSeedPhrase seedPhrase={seedPhrase} />;
    }
    case FilecoinSimulationKeys.ShowcasePublicKey: {
      return (
        <ShowcasePublicKey
          publicKey={publicKey}
          seedPhrase={seedPhrase}
          f4Address={f4Address}
        />
      );
    }
    case FilecoinSimulationKeys.TransferCypto:
      return <Transaction network={"FIL"} />;
    default:
      return <></>;
  }
};

export default RenderSimulation;
