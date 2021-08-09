import { Button, useColorMode } from "@chakra-ui/react"
import { FiSun, FiMoon } from "react-icons/fi";


export default function Toggle() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
      <Button
        ml="2"
        onClick={toggleColorMode}
       >
        {colorMode === "light" ? <FiMoon /> : <FiSun />}
      </Button>
  )
}
