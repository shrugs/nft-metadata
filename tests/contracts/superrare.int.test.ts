import { Agent, SUPERRARE_TOKEN_ADDRESS } from '../../src'
import { testProvider } from '../setupProvider'
import { isAddress } from '@ethersproject/address'

const SUPERARE_CRITERIA = {
  input: {
    tokenId: '17798',
    tokenAddress: SUPERRARE_TOKEN_ADDRESS,
    networkId: 1,
  },
}

describe('Superrare ERC721', () => {
  const parser = new Agent({
    providers: {
      1: testProvider,
    },
    ipfsGateway: 'https://ipfs.fleek.co',
    fetchTimeout: 60000,
  })

  beforeEach(() => {
    jest.setTimeout(120000)
  })

  it(`should be able to fetch and parse metadata for token id: ${SUPERARE_CRITERIA.input.tokenId} on network: ${SUPERARE_CRITERIA.input.networkId}`, async () => {
    const { ownerAddress, ...meta } = await parser.fetchAndParseTokenData(
      1,
      SUPERARE_CRITERIA.input.tokenAddress,
      SUPERARE_CRITERIA.input.tokenId,
    )
    expect(meta).toMatchSnapshot()
    expect(isAddress(ownerAddress)).toBeTruthy()
  })
})
