import { useState, useEffect } from "react";
import { useContractRead } from "wagmi";
import { useFactoryParams } from './useFactoryParams';


interface PropsUseContractReadValue {
    value: string|undefined;
    isLoading: boolean;
    isError: boolean;
    isRefetching: boolean;
    refetch: () => void;
}

const useContractReadByValue = (functionName: string, args?: Array<string>): PropsUseContractReadValue => {
    const [ value, setValue ] = useState<any|undefined>();
    const { factoryAddress, factoryAbi } = useFactoryParams();
    const { data, isLoading, isError, isRefetching, refetch } = useContractRead({
        addressOrName: factoryAddress,
        contractInterface: factoryAbi,
        functionName: functionName,
        args: args,        
    });

    useEffect(() => {        
        if (data === undefined) return;
        setValue(data?.toString());
    }, [ data ]);

    return { value, isLoading, isError, isRefetching, refetch };
}

export const useFactoryReadGetAllHdcContracts = (): PropsUseContractReadValue => {
    return useContractReadByValue("getAllHDCContracts", []);
}

export const useFactoryReadSupportedFees = (supportedFees: string|undefined): PropsUseContractReadValue => {
    const args = (supportedFees) ? [ supportedFees ] : undefined;
    return useContractReadByValue("supportedFees", args);
}

export const useFactoryReadSupportedVestingPeriods = (vestingPeriod: string): PropsUseContractReadValue => {
    return useContractReadByValue("supportedVestingPeriods", [ vestingPeriod]);
}
