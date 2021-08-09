import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractCall, useContractFunction } from "@usedapp/core";

// hooks/index.ts
export function useContractMethod(contractAddress: string, contractAbi:any, method: string) {
  const contract = new Contract(contractAddress, contractAbi);
  const { state, send } = useContractFunction(contract, method, {});
  return { state, send };
}
