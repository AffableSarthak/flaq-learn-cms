import React from 'react'
import SimulationLayout from '../../components/simulation/layout/SimulationLayout'
import { SimulationPageType } from '../../components/simulation/types'
import { getCreateWalletSimulationData } from '../../components/simulation/utils/data'

const CreateWalletSimulationPage = ({
  simulationData,
  simulationHeader,
}: SimulationPageType) => {
  return (
    <SimulationLayout
      simulationData={simulationData}
      simulationHeader={simulationHeader}
    />
  )
}

export async function getServerSideProps(context: any) {
  const simulationData = getCreateWalletSimulationData()

  return {
    props: {
      simulationData: simulationData,
      simulationHeader: 'Wallet Creation',
    },
  }
}

export default CreateWalletSimulationPage
