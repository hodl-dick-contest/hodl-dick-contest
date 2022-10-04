import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import ContestJsonAbi from "../abi/HDCContest.json";


export interface QueryUseConvertToShares {
    shares?: string;
    isLoading: boolean;
    isError: boolean;
}

export const useConvertToShares = (address: string, assets: string): QueryUseConvertToShares => {

    const [ shares, setShares ] = useState<string>();

    const contractAddress: string = address!;
    const contractAbi: string = JSON.stringify(ContestJsonAbi);

    const { data, isLoading, isError } = useContractRead({
        addressOrName: contractAddress,
        contractInterface: contractAbi,
        functionName: "convertToShares",
        args: [ assets ],
    });

    useEffect(() => {
        if (data) setShares(data.toString()) ;
    }, [ data ])

    return { shares, isLoading, isError };
    
}
