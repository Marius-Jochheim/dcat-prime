import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { ERC20Interface  } from "@usedapp/core";

const CORE_ABI = require('./abis/Core.json')
const ERC20_ABI = require('./abis/ERC20.json')
const TOKEN_MINTER_ABI = require('./abis/TokenMinter.json')
const TOKEN_SPENDER_ABI = require('./abis/TokenSpender.json')

const CORE_ADDRESS = "0xE995d8E9E0a01c938e6ae5B05720Af245953dC57"
const TOKEN_MINTER_ADDRESS = "0xDEe1031c5D64788976E78d78c63C2fd6b411c4ee"
const TOKEN_SPENDER_ADDRESS = "0xE39b9D5dC766102181D4C5Cd7df1691565B52032"


export default function createOption(account, margin, strike, tokenAddress, oracleIdAddress, syntheticIdAddress) => {

  const tokenContract = new Contract(tokenAddress, ERC20Interface)
  const coreContract = new Contract(CORE_ADDRESS, CORE_ABI)

  const owner = account
  const seller = account

  endTime = ~~(Date.now() / 1000) + SECONDS_40_MINS // Now + 40 mins

  // Define derivative params
  const derivative = derivativeFactory({
    margin,
    endTime,
    params: [ strike ],
    oracleId: oracleIdAddress,
    token: tokenAddress,
    syntheticId: syntheticIdAddress
  })
  quantity = 3



}
