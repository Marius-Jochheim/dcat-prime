import {useContractMethod} from '../hooks'
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import {
  Box,
  Button,
  Heading,
} from "@chakra-ui/react";

type Props = {
  contractAbi: any;
  contractAddress: string;
};

export default function ConfirmOptionTransaction({ contractAbi, contractAddress }: Props) {
  const { state: approveWETHSpendStatus, send:approveWETHSpend } = useContractMethod(contractAbi, contractAddress, 'approve')

  const spendToSpender = (wethAmount: string) => {
    approveWETHSpend(TOKEN_SPENDER_ADDRESS, utils.parseEther(wethAmount))
  }

  return (
    <Box
      mt="4"
    >

      <Heading as="h4" size="md" py="6">
        Please Confirm Your Transaction
      </Heading>

      <Button onClick={handleTransaction} >
        Transact Now
      </Button>

    </Box>
  )
}
