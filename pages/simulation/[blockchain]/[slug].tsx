import React, { useEffect, useState } from 'react'
import SimulationLayout from '../../../components/simulation/layout/SimulationLayout'
import { SimulationPageType } from '../../../components/simulation/types'
import { getSimulationData } from '../../../components/simulation/utils/data'

const CreateWalletSimulationPage = ({
  simulationData,
  simulationHeader,
  blockchain,
}: SimulationPageType) => {
  const [domLoaded, setDomLoaded] = useState(false)

  useEffect(() => {
    setDomLoaded(true)
  }, [domLoaded])

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
  )
}

export async function getServerSideProps(context: any) {
  const { slug, blockchain } = context.query
  const simulationData = getSimulationData(slug, blockchain)

  if (!simulationData) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      simulationData: simulationData,
      simulationHeader: 'Wallet Creation Simulation',
      blockchain,
    },
  }
}

export default CreateWalletSimulationPage
