import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import Layout from "./components/Layout";
import ConnectButton from "./components/ConnectButton";
import IssueCoverStepper from "./components/IssueCoverStepper";
import BasicSteps from "./components/BasicSteps";
import AccountModal from "./components/AccountModal";
import MainNav from "./components/MainNav";
import "@fontsource/inter";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <MainNav />

      <Layout>
        <IssueCoverStepper/>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
