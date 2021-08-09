import {
  Button,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
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
  useDisclosure,
  useColorModeValue
} from "@chakra-ui/react";
import { ChainId, ERC20Interface, useContractCalls, useEthers, useEtherBalance  } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { formatUnits } from '@ethersproject/units'
import uniswapToken from '@uniswap/default-token-list';

import ConnectButton from "./ConnectButton";

import { useState } from "react";

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
  const balances = useTokensBalance(tokenList, account)
  const etherBalance = useEtherBalance(account)

  const [selectedToken, setSelectedToken] = useState("ETH");
  const [selectedBalance, setSelectedBalance] = useState(etherBalance);

  const bg = useColorModeValue('white', 'gray.700');

  const getBalance = () => {
    let tokenIndex = tokenList.findIndex(x => x.symbol === selectedToken);
    return (selectedToken === "ETH")
    ?
      (etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3))
    :
      ( tokenIndex !== -1 && formatUnits(balances[tokenIndex]![0],tokenList[tokenIndex].decimals))
  }

  return account ? (
    <Box
      display="flex"
      alignItems="center"
      bg={bg}
      borderRadius="xl"
      py="8"
      px="8"
      minW="500px"
    >
      <Box>
        <Heading
          as="h1"
          size="md"
          mb="3"
          py="4"
        >
          Create Option
        </Heading>
        <FormControl id="first-name" isRequired>
          <FormLabel>Margin Token & Amount</FormLabel>
          <Grid
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(2, 1fr)"
          gap={4}
          >
            <GridItem colSpan={1}>
              <Select
                onChange={(evt) => setSelectedToken(evt.target.value)} variant="filled" value={selectedToken}  placeholder="Select Token">
                <option key="ETH" value="ETH">ETH</option>
                {tokenList &&
                  tokenList.map((token, idx) => (
                    <option key={token.symbol} value={token.symbol}>{token.symbol}</option>
                ))}
              </Select>
            </GridItem>
            <GridItem colSpan={1}>
              <NumberInput defaultValue={0.0} min={0.0} max={selectedToken === "ETH" ? (etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)) : "None"} precision={3} step={0.1}>
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
        <FormControl id="first-name" isRequired>
          <FormLabel>Oracle Contract Address</FormLabel>
          <Input placeholder="0x0000000000000" />
        </FormControl>
      </Box>
    </Box>
  ) : (
    <ConnectButton handleOpenModal={onOpen} />
  );
}
