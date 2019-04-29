/**
 * @jest-environment node
 */
const Ganache = require('ganache-core')
const Web3 = require('web3')
const compile = require('./compile')

describe('Earnings Divider', () => {
  let contractInstance
  let accounts
  let provider
  let web3
  beforeAll(async () => {
    const {earningDivider} = await compile('earningDivider.sol')

    provider = Ganache.provider()
    web3 = new Web3(provider)
    accounts = await web3.eth.getAccounts()

    const data = earningDivider.evm.bytecode.object

    const instance = new web3.eth.Contract(earningDivider.abi)

    const gas = await instance.deploy({data}).estimateGas()

    const deployedInstance = await instance
      .deploy({data})
      .send({from: accounts[0], gas: gas + 1})

    contractInstance = deployedInstance
  })

  afterAll(async () => {
    provider.stop()
  })
  it('lel', () => {})
})
