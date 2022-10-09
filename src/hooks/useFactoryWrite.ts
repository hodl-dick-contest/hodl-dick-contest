import { useFactoryParams } from "./useFactoryParams";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";


const useFactoryWriteByValue = (contractAddress: string, functionName: string, args?: Array<string>, gasLimit?: number) => {
    const { factoryAbi } = useFactoryParams();
    const { config } = usePrepareContractWrite({
        addressOrName: contractAddress,
        contractInterface: factoryAbi,
        functionName: functionName,
        args: args,
        overrides: {
            gasLimit: gasLimit,
        },
    });
    const writeContract = useContractWrite(config);
    const transaction = useWaitForTransaction({ hash: writeContract.data?.hash });
    return { writeContract, transaction };
}

export const useFactoryWriteDeploy = (contractAddress: string, asset: string, fees: string, vestingPeriod: string, gasLimit?: number) => {
    console.log("asset", asset);
    console.log("fees", fees);
    console.log("vestingPeriod", vestingPeriod);
    return useFactoryWriteByValue(contractAddress, "deployHDC", [ asset, fees, vestingPeriod ], gasLimit);
}
