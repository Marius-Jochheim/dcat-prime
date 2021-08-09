import {
  Box,
  Flex,
  Icon,
  Text,
  useColorModeValue
} from "@chakra-ui/react";

type Props = {
  icon: any,
  isSelected: boolean,
  title: String,
  children: any
};

export default function SelectCard ({icon, isSelected, title, children}:Props) {
  let bg = useColorModeValue('gray.100', 'gray.800');
  let bgSelected = useColorModeValue('gray.200', 'gray.700');
  let iconColor = useColorModeValue("gray.900","white");
  return (
    <Flex
      bg={isSelected ? bgSelected : bg}
      align="center"
      justify="center"
      direction="column"
      py="16"
      my="8"
      borderRadius="xl"
      borderWidth="2px"
      borderColor={isSelected ? "brand.100" : false}
      cursor="pointer"
    >
       <Icon color={isSelected ? iconColor : "gray.500"} as={icon} w={24} h={24} />
       {children}
    </Flex>
  );
};
