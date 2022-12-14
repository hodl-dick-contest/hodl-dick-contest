import { BigNumber } from "ethers";
import { useContractAbi } from "./useContractAbi";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";


const useContractWriteByValue = (contractAddress: string, functionName: string, args?: Array<string>|undefined) => {
    const { contractAbi } = useContractAbi();
    const { config } = usePrepareContractWrite({
        addressOrName: contractAddress,
        contractInterface: contractAbi,
        functionName: functionName,
        args: args,
        cacheTime: 10_000,
    })
    const writeContract = useContractWrite(config);
    const transaction = useWaitForTransaction({ hash: writeContract.data?.hash });
    return { writeContract, transaction };
}

export const useContractWriteApprove = (contractAddress: string, spender: string, amount: BigNumber|undefined) => {
    return useContractWriteByValue(contractAddress, "approve", [ spender, (amount) ? amount.toString() : "" ]);
}

export const useContractWriteDeposit = (contractAddress: string, assets: BigNumber|undefined, receiver: string) => {
    return useContractWriteByValue(contractAddress, "deposit", [ (assets) ? assets.toString() : "" , receiver ]);
}

export const useContractWriteRedeem = (contractAddress: string, shares: BigNumber|undefined, receiver: string, owner: string) => {
    return useContractWriteByValue(contractAddress, "withdraw", [ (shares) ? shares.toString() : "" , receiver, owner ]);
}

export const useContractWriteWithdraw = (contractAddress: string, assets: BigNumber|undefined, receiver: string, owner: string) => {
    return useContractWriteByValue(contractAddress, "withdraw", [ (assets) ? assets.toString() : "" , receiver, owner ]);
}
