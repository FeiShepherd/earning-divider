/**
 * @jest-environment node
 */
const Ganache = require('ganache-core')
const Web3 = require('web3')
const compile = require('./compile')

describe('test stuff', () => {
  let contractInstance
  let accounts
  let provider
  let web3
  beforeAll(async () => {
    const {SimpleStorage} = await compile('SimpleStorage.sol')

    provider = Ganache.provider()
    web3 = new Web3(provider)
    accounts = await web3.eth.getAccounts()

    const data = SimpleStorage.evm.bytecode.object

    const instance = new web3.eth.Contract(SimpleStorage.abi)

    const gas = await instance.deploy({data}).estimateGas()

    const deployedInstance = await instance
      .deploy({data})
      .send({from: accounts[0], gas: gas + 1})

    contractInstance = deployedInstance
  })

  afterAll(async () => {
    provider.stop()
  })

  it('should test contract', async () => {
    const oldVal = await contractInstance.methods.get().call()

    await contractInstance.methods.set(5).send({from: accounts[0]})

    const newVal = await contractInstance.methods.get().call()

    expect(oldVal).toBe('0')
    expect(newVal).toBe('5')
  })
})
