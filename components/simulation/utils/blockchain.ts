export const getBlockchainData = () => {
  const data = [
    {
      name: "Solana",
      simulations: [
        {
          name: "Create Wallet",
          url: "solana/create-wallet",
        },
      ],
    },
    {
      name: "Algorand",
      simulations: [
        {
          name: "Create Wallet",
          url: "algorand/create-wallet",
        },
      ],
    },
    {
      name: "EVM",
      simulations: [],
    },
  ];

  return data;
};
