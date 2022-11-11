import React from 'react'
import SimulationLayout from '../../../components/simulation/layout/SimulationLayout'
import { SimulationPageType } from '../../../components/simulation/types'
import { getSimulationData } from '../../../components/simulation/utils/data'

const CreateWalletSimulationPage = ({
  simulationData,
  simulationHeader,
  blockchain,
}: SimulationPageType) => {
  return (
    <SimulationLayout
      simulationData={simulationData}
      simulationHeader={simulationHeader}
      blockchain={blockchain}
    />
  )
}

export async function getServerSideProps(context: any) {
  const { slug, blockchain } = context.query
  const simulationData = getSimulationData(slug, blockchain)

  return {
    props: {
      simulationData: simulationData,
      simulationHeader: 'Wallet Creation Simulation',
      blockchain,
    },
  }
}

export default CreateWalletSimulationPage
