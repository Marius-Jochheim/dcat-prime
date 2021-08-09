import {
  Button,
  Box,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Icon,
  Text,
  Select,
  Stack,
  Heading,
  Grid,
  GridItem,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
  useDisclosure,
  useColorModeValue
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps"
import { FiClipboard, FiDollarSign, FiTrendingUp, FiWind, FiUmbrella, FiMapPin, FiThermometer, FiCloudRain, FiSend, FiUser } from "react-icons/fi"

import { ChainId, ERC20Interface, useContractCalls, useContractFunction, useEthers, useEtherBalance, useSendTransaction  } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { formatUnits } from '@ethersproject/units'
import uniswapToken from '@uniswap/default-token-list';
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'

import {useContractMethod} from '../hooks'

import ConfirmOptionTransaction from "./ConfirmOptionTransaction";
import ConnectButton from "./ConnectButton";
import ResetButtons from "./ResetButtons";
import StepButtons from "./StepButtons";
import SelectCard from "./SelectCard";

import { useState, useEffect } from "react";

const CORE_ABI = require('../abis/Core.json');
const TOKEN_MINTER_ABI = require('../abis/TokenMinter.json')
const TOKEN_SPENDER_ABI = require('../abis/TokenSpender.json')

const WETH_ADDRESS = "0xc778417e063141139fce010982780140aa0cd5ab"
const CORE_ADDRESS = "0xE995d8E9E0a01c938e6ae5B05720Af245953dC57"
const TOKEN_MINTER_ADDRESS = "0xDEe1031c5D64788976E78d78c63C2fd6b411c4ee"
const TOKEN_SPENDER_ADDRESS = "0xE39b9D5dC766102181D4C5Cd7df1691565B52032"

const { derivativeFactory, getDerivativeHash } = require('../utils/derivatives')
const { calculateLongTokenId, calculateShortTokenId } = require('../utils/positions')

let optionCall
let quantity, endTime
let hash
const SECONDS_40_MINS = 60 * 40


function getTokenList(chainId?: ChainId) {
  return uniswapToken.tokens.filter((token) => token.chainId == chainId)
}

function useTokensBalance(tokenList: any[], account?: string | null) {
  return useContractCalls(
    tokenList && account
      ? tokenList.map((token: any) => ({
          abi: ERC20Interface,
          address: token.address,
          method: 'balanceOf',
          args: [account],
        }))
      : []
  )
}

type Props = {
  handleOpenModal: any;
};


export default function IssueCoverStepper({ handleOpenModal }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { chainId, activateBrowserWallet, deactivate, account } = useEthers()

  const tokenList = getTokenList(chainId)
  console.log(tokenList);

  const balances = useTokensBalance(tokenList, account)
  console.log(balances);

  const etherBalance = useEtherBalance(account)
  const { send: sendTransaction, state: state } = useSendTransaction()
  const { state: approveWETHSpendStatus, send:approveWETHSpend } = useContractMethod(WETH_ADDRESS, ERC20Interface, 'approve')

  const spendToSpender = (wethAmount: string) => {
    approveWETHSpend(TOKEN_SPENDER_ADDRESS, utils.parseEther(wethAmount))
  }

  const [selectedCase, setSelectedCase] = useState(0);
  const [selectedToken, setSelectedToken] = useState("WETH");
  const [selectedBalance, setSelectedBalance] = useState(etherBalance);
  const [selectedMargin, setSelectedMargin] = useState(0.0);

  const { nextStep, prevStep, reset, activeStep, lastStep } = useSteps({
    initialStep: 0,
  })

  const getBalance = () => {
    let tokenIndex = tokenList.findIndex(x => x.symbol === selectedToken);
    console.log(balances);


    if(balances.length > 0){
      return tokenIndex !== -1 && formatUnits(balances[tokenIndex]![0],tokenList[tokenIndex].decimals)
    }
  }

  const getSelectedToken = () => {
    let tokenIndex = tokenList.findIndex(x => x.symbol === selectedToken);
    return tokenIndex !== -1 && tokenList[tokenIndex]
  }

  const handleTransaction = async () => {

    const owner = account
    const buyer = account
    const seller = account

    let token = getSelectedToken();
    const tokenContract = new Contract(token.address, ERC20Interface)
    const coreContract = new Contract(CORE_ADDRESS, CORE_ABI)

    // let margin = utils.parseUnits(selectedMargin.toString(), token.decimals)

    endTime = ~~(Date.now() / 1000) + SECONDS_40_MINS // Now + 40 mins

    // Define derivative params
    const optionCall = derivativeFactory({
      margin: '100000000000',
      endTime,
      params: [ 200 ],
      oracleId: "0x7297adE4a2132b5a21453D0C45a80d257636401D",
      token: token.address,
      syntheticId: "0x3d357F1B6Fb44de45c7D3705A807e23509a01D64"
    })
    quantity = 3

    spendToSpender('0.5');

    // while(approveSpendState !== 'approve'){
    //
    // }

    // hash = await getDerivativeHash(optionCall)
    // console.log("Derivative Hash created: ", hash);
    // //
    // const longTokenId = calculateLongTokenId(hash)
    // console.log("Long Token created: ", longTokenId);
    // //
    // const shortTokenId = calculateShortTokenId(hash)
    // console.log("Short Token created: ", shortTokenId);

    // Create derivative
    // const createInstance = await core.create(...callParams)
    // console.log("Create: ", createInstance);

    //
    // const oldCoreTokenBalance = await edotToken.balanceOf(core.address, { from: owner })
    // console.log("Old Core Token Balance: ", oldCoreTokenBalance);

  }

  useEffect(() => {
    console.log("State of transaction changed: ", approveWETHSpendStatus);
  }, [approveWETHSpendStatus]);

  const contentCase = (
    <Box
      mt="4"
    >
      <Heading as="h4" size="md" py="6">
        What would you like to insure against?
      </Heading>

      <FormControl id="first-name" isRequired>
        <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={4}
        >
          <GridItem onClick={() => setSelectedCase(0)} colSpan={1}>
            <SelectCard onClick={() => { console.log("button clicked");}} isSelected={selectedCase === 0} icon={FiCloudRain} title="Heavy Rain">
              <Heading
               textAlign="center"
               pt="6"
               as="span"
               size="md"
              >
               Heavy Rainfall
              </Heading>
              <Text
               textAlign="center"
               pt="2"
              >
               <Icon as={FiMapPin} w={4} h={4}/> near Eifel, Germany
              </Text>
            </SelectCard>
          </GridItem>
          <GridItem onClick={() => setSelectedCase(1)} colSpan={1}>
            <SelectCard isSelected={selectedCase === 1} icon={FiWind} title="Tornado">
              <Heading
               textAlign="center"
               pt="6"
               as="span"
               size="md"
              >
               Tornado
              </Heading>
              <Text
               textAlign="center"
               pt="2"
              >
               <Icon as={FiMapPin} w={4} h={4}/> near Oklahoma, US
              </Text>
            </SelectCard>
          </GridItem>
        </Grid>
      </FormControl>

    </Box>
  )

  const contentMargin = (
    <Box
      mt="4"
    >

      <Heading as="h4" size="md" py="6">
        Select Case Price
      </Heading>

      <FormControl id="first-name" isRequired>
        <FormLabel>Margin Token & Amount</FormLabel>
        <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={4}
        >
          <GridItem colSpan={1}>
            <Select
              onChange={(evt) => setSelectedToken(evt.target.value)} variant="filled" value={selectedToken}  placeholder="Select Token">
              {tokenList &&
                tokenList.map((token, idx) => (
                  <option key={token.symbol} value={token.symbol}>{token.symbol}</option>
              ))}
            </Select>
          </GridItem>
          <GridItem colSpan={1}>
            <NumberInput defaultValue={0.0} isRequired min={0.01} max={getBalance()} precision={3} step={0.1}>
            <NumberInputField textAlign="right" />
            </NumberInput>
            <Text
              py="4"
              textAlign="right"
            >
              Max: {getBalance()}
            </Text>
          </GridItem>
        </Grid>
      </FormControl>
    </Box>
  )

  const contentTransaction = <ConfirmOptionTransaction contractAddress={getSelectedToken().address} contractAbi={ERC20Interface}

  const steps = [
    { label: "Case", icon: FiUmbrella, content: contentCase },
    { label: "Cover Details", icon: FiTrendingUp, content: contentMargin },
    { label: "Transaction", icon: FiSend, content: contentTransaction },
  ]


  const bg = useColorModeValue('white', 'gray.800');

  return account ? (
    <Box
      bg={bg}
      borderRadius="xl"
      py="8"
      px="8"
      w="100%"
      maxW="720px"
    >
      <VStack width="100%">
      <Steps colorScheme="purple" activeStep={activeStep}>
        {steps.map(({ label, content, icon }) => (
          <Step label={label} key={label} icon={icon}>
            <Box
              w="100%"
            >
            {content}
            </Box>
          </Step>
        ))}
      </Steps>
      {activeStep === 3 ? (
        <ResetButtons onReset={reset} />
      ) : (
        <StepButtons
          {...{ nextStep, prevStep, lastStep }}
          prevDisabled={activeStep === 0}
        />
      )}
      </VStack>
    </Box>
  ) : (
    <ConnectButton handleOpenModal={onOpen} />
  );
}
