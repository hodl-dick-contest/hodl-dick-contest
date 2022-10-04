import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import ContestJsonAbi from "../abi/HDCContest.json";


export interface QueryUseConvertToAssets {
    assets?: string;
    isLoading: boolean;
    isError: boolean;
}

export const useConvertToAssets = (address: string, shares: string): QueryUseConvertToAssets => {

    const [ assets, setAssets ] = useState<string>();

    const contractAddress: string = address!;
    const contractAbi: string = JSON.stringify(ContestJsonAbi);

    const { data, isLoading, isError } = useContractRead({
        addressOrName: contractAddress,
        contractInterface: contractAbi,
        functionName: "convertToAssets",
        args: [ shares ],
    });

    useEffect(() => {
        if (data) setAssets(data.toString()) ;
    }, [ data ])

    return { assets, isLoading, isError };
    
}
