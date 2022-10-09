import { useState, useEffect } from "react";
import { useContractRead } from "wagmi";
import { useFactoryParams } from './useFactoryParams';


interface PropsUseContractReadValue {
    value?: string;
    isLoading: boolean;
    isError: boolean;
    isRefetching: boolean;
    refetch: () => void;
}

const useContractReadByValue = (functionName: string, args?: Array<string>): PropsUseContractReadValue => {

    const [ value, setValue ] = useState<string>();    
    const { factoryAddress, factoryAbi } = useFactoryParams();
    const { data, isLoading, isError, isRefetching, refetch } = useContractRead({
        addressOrName: factoryAddress,
        contractInterface: factoryAbi,
        functionName: functionName,
        args: args,        
    });

    useEffect(() => {
        if (data !== undefined) setValue(data.toString) ;
    }, [ data ])

    return { value, isLoading, isError, isRefetching, refetch };
}

export const useFactoryReadGetAllHdcContracts = (): PropsUseContractReadValue => {
    return useContractReadByValue("getAllHDCContracts", []);
}

export const useFactoryReadSupportedFees = (supportedFees: string): PropsUseContractReadValue => {
    return useContractReadByValue("supportedFees", [ supportedFees]);
}

export const useFactoryReadSupportedVestingPeriods = (vestingPeriod: string): PropsUseContractReadValue => {
    return useContractReadByValue("supportedVestingPeriods", [ vestingPeriod]);
}
