import { useRouter } from "next/router";
import React from "react";
import SimulationCard from "../../../components/simulation/SimulationCard";
import SimulationLayout from "../../../components/simulation/SimulationLayout";
import { simulationProps } from "../../../components/simulation/SimulationProps";

type Props = {
  simulationData: simulationProps[];
  currentSimulation: simulationProps;
};

const WalletCreation = ({ simulationData, currentSimulation }: Props) => {
  const router = useRouter();
  return (
    <SimulationLayout simulationData={simulationData}>
      <SimulationCard currentSimulation={currentSimulation} />
    </SimulationLayout>
  );
};


export async function getServerSideProps(context: any) {
  const slug = context.query.slug;

  const simulationData = [
    {
      name: "Create a wallet",
      slug: "create-a-wallet",
    },
    {
      name: "Backup Seed Phrase",
      slug: "backup-seed-phrase",
    },
    {
      name: "Showcase the Public Key",
      slug: "showcase-the-public-key",
    },
    {
      name: "Request for testnet airdrop on for the wallet",
      slug: "request-for-testnet-airdrop-on-for-the-wallet",
    },
  ];

  const simulation = simulationData.find((item) => item.slug === slug);
  return {
    props: {
      simulationData: simulationData,
      currentSimulation: simulation ? simulation : simulationData[0],
    },
  };
}

export default WalletCreation;
