/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/dive-into-web3/the-term-web3-explained',
        destination:
          '/blog/The-term-web3-explained-7fb3ed32bd34451daedaab72203c6fbe',
        permanent: true,
      },
      {
        source: '/dive-into-web3/the-technology-behind-web3-blockchain',
        destination:
          '/blog/The-technology-behind-web3-Blockchain-a629848931f2457480f6044d74c09370',
        permanent: true,
      },
      {
        source: '/dive-into-web3/cryptocurrencies-the-a-to-z-guide',
        destination:
          '/blog/Cryptocurrencies-the-A-to-Z-guide-2fe7d7f63e6d4e16bfa2b412f23db3df',
        permanent: true,
      },
      {
        source: '/dive-into-web3/tokens-the-basics-covered-for-you',
        destination:
          '/blog/Tokens-The-basics-covered-for-you-20c2acf15d494c4c84aa3fe3cc765912',
        permanent: true,
      },
      {
        source: '/dive-into-web3/dapps-not-your-regular-apps',
        destination:
          '/blog/DApps-Not-your-regular-apps-786ffb704781462fba77f4361e675c51',
        permanent: true,
      },
      {
        source: '/dive-into-web3/smart-contracts-what-are-they',
        destination:
          '/blog/Smart-Contracts-What-Are-They-b806d01f262847fbbf34ae222ac2ce2a',
        permanent: true,
      },
      {
        source: '/dive-into-web3/the-famous-coins-bitcoin-ethereum-and-solana',
        destination:
          '/blog/The-famous-coins-Bitcoin-Ethereum-and-Solana-a9d6baf442de4cf69f2f611cb1a7f7fa',
        permanent: true,
      },
      {
        source: '/dive-into-web3/is-crypto-worth-investing-in',
        destination:
          '/blog/Is-Crypto-worth-investing-in-e01554b9da994c6baad4dbafe0d4152e',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['media.giphy.com'],
  },
}

module.exports = nextConfig
