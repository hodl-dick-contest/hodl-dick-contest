import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import factoryAddressJsonAbi from "../abi/HDCFactory.json";


export interface QueryUseFactoryListChildren {
    children: Array<string>;
    isLoading: boolean;
    isError: boolean;
}

export const useFactoryListChildren = (): QueryUseFactoryListChildren => {
    
    const [ children, setChildren ] = useState<Array<string>>([]);

    const contractAddress: string = process.env.REACT_APP_FACTORY_ADDRESS!;
    const contractAbi: string = JSON.stringify(factoryAddressJsonAbi);

    console.log("Factory address", contractAddress);

    const { data, isLoading, isError } = useContractRead({
        addressOrName: contractAddress,
        contractInterface: contractAbi,
        functionName: "getAllHDCContracts",
        args: [],
        cacheOnBlock: true,
    })

    useEffect(()=> {
        if (data) {
            setChildren([...data]);
        }
    }, [ data ]);

    return { children, isLoading, isError }

};
