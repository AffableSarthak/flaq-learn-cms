import { GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";
import SimulationLayout from "../../../components/simulation/layout/SimulationLayout";
import {
  Blockchains,
  SimulationPageType,
} from "../../../components/simulation/types";
import { getSimulationData } from "../../../components/simulation/utils/data";

const CreateWalletSimulationPage = ({
  simulationData,
  simulationHeader,
  blockchain,
}: SimulationPageType) => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, [domLoaded]);

  return (
    <>
      {domLoaded ? (
        <SimulationLayout
          simulationData={simulationData}
          simulationHeader={simulationHeader}
          blockchain={blockchain}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export async function getServerSideProps(
  context: GetServerSidePropsContext & {
    query: { slug: string; blockchain: Blockchains };
  }
) {
  const { slug, blockchain } = context.query;
  const data = getSimulationData(slug, blockchain);

  if (!data?.simulationData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      simulationData: data.simulationData,
      simulationHeader: data.simulationHeader,
      blockchain,
    },
  };
}

export default CreateWalletSimulationPage;
