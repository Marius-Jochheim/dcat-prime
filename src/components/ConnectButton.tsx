import { Button, Box, Text, useColorModeValue } from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { Step, Steps, useSteps } from "chakra-ui-steps"

import Identicon from "./Identicon";

type Props = {
  handleOpenModal: any;
};

export default function ConnectButton({ handleOpenModal }: Props) {
  const { chainId, activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  const bgColor = useColorModeValue("gray.200", "gray.700")
  const buttonColor = useColorModeValue("gray.400", "gray.900")
  const textColor = useColorModeValue("black", "white")

  return account ? (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        background={bgColor}
        borderRadius="xl"
        py="0"
      >
        <Box px="3">
          <Text color={textColor} fontSize="md">
            {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH
          </Text>
        </Box>
        <Button
          onClick={handleOpenModal}
          bg={buttonColor}
          border="1px solid transparent"
          _hover={{
            border: "1px",
            borderStyle: "solid",
            borderColor: "blue.400",
            backgroundColor: "gray.700",
          }}
          borderRadius="xl"
          m="1px"
          px={3}
          height="38px"
        >
          <Text color={textColor} fontSize="md" fontWeight="medium" mr="2">
            {account &&
              `${account.slice(0, 6)}...${account.slice(
                account.length - 4,
                account.length
              )}`}
          </Text>
          <Identicon />
        </Button>
      </Box>
    </Box>
  ) : (
    <Button
      onClick={handleConnectWallet}
      bg="blue.800"
      color="blue.300"
      fontSize="lg"
      fontWeight="medium"
      borderRadius="xl"
      border="1px solid transparent"
      _hover={{
        borderColor: "blue.700",
        color: "blue.400",
      }}
      _active={{
        backgroundColor: "blue.800",
        borderColor: "blue.700",
      }}
    >
      Connect to a wallet
    </Button>
  );
}
