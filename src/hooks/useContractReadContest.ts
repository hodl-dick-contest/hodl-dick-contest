import { BigNumber } from "ethers";
import { useState, useEffect } from "react";
import { useContractAbi } from "./useContractAbi";
import { useContractRead } from "wagmi";


interface PropsUseContractReadValue {
    value?: string;
    isLoading: boolean;
    isError: boolean;
    isRefetching: boolean;
    refetch: () => void;
}

const useContractReadByValue = (contractAddress: string, functionName: string, args?: Array<string>|undefined ): PropsUseContractReadValue => {

    const [ value, setValue ] = useState<string>();    
    const { contractAbi } = useContractAbi();
    const { data, isLoading, isError, isRefetching, refetch } = useContractRead({
        addressOrName: contractAddress,
        contractInterface: contractAbi,
        functionName: functionName,
        args: args,
        cacheOnBlock: true,
    });

    useEffect(() => {
        if (data) setValue(data.toString()) ;
    }, [ data ])

    return { value, isLoading, isError, isRefetching, refetch };
}

export const useContractReadAllowance = (contractAddress: string, owner: string, spender: string): PropsUseContractReadValue => {
    return useContractReadByValue(contractAddress, "allowance", [ owner, spender]);
}

export const useContractReadAsset = (contractAddress: string): PropsUseContractReadValue => {
    return useContractReadByValue(contractAddress, "asset");
}

export const useContractReadBalanceOf = (contractAddress: string, address?: string): PropsUseContractReadValue => {
    return useContractReadByValue(contractAddress, "balanceOf", [ address! ]);
}

export const useContractReadConvertToAssets = (contractAddress: string, shares: string|undefined): PropsUseContractReadValue => {
    return useContractReadByValue(contractAddress, "convertToAssets", (shares) ? [ shares ] : undefined);
}

export const useContratReadConvertToShares = (contractAddress: string, assets: BigNumber|undefined): PropsUseContractReadValue => {
    return useContractReadByValue(contractAddress, "convertToShares", (assets) ? [ assets.toString() ] : undefined);
}

export const useContractReadDecimals = (contractAddress: string): PropsUseContractReadValue => {
    return useContractReadByValue(contractAddress, "decimals");
}

export const useContractReadLastUpdate = (contractAddress: string): PropsUseContractReadValue => {
    return useContractReadByValue(contractAddress, "lastUpdate");
}

export const useContractReadLockProfit = (contractAddress: string): PropsUseContractReadValue => {
    return useContractReadByValue(contractAddress, "lockProfit");
}

export const useContractReadMaxRedeem= (contractAddress: string, owner: string): PropsUseContractReadValue => {
    return useContractReadByValue(contractAddress, "maxRedeem", [ owner ]);
}

export const useContractReadMaxWithdraw = (contractAddress: string, owner: string): PropsUseContractReadValue => {
    return useContractReadByValue(contractAddress, "maxWithdraw", [ owner ]);
}

export const useContractReadName = (contractAddress: string): PropsUseContractReadValue => {
    return useContractReadByValue(contractAddress, "name");
}

export const useContractReadPreviewDeposit = (contractAddress: string, deposit: BigNumber|undefined): PropsUseContractReadValue => {
    return useContractReadByValue(contractAddress, "previewDeposit", (deposit) ? [deposit.toString()] : undefined );
}

export const useContractReadPreviewRedeem = (contractAddress: string, withdraw: BigNumber): PropsUseContractReadValue => {
    return useContractReadByValue(contractAddress, "previewRedeem", [withdraw.toString()] );
}

export const useContractReadPreviewWithdraw = (contractAddress: string, withdraw: BigNumber): PropsUseContractReadValue => {
    return useContractReadByValue(contractAddress, "previewWithdraw", [withdraw.toString()] );
}

export const useContractReadSymbol = (contractAddress: string): PropsUseContractReadValue => {
    return useContractReadByValue(contractAddress, "symbol");
}

export const useContractReadTotalAssets = (contractAddress: string): PropsUseContractReadValue => {
    return useContractReadByValue(contractAddress, "totalAssets");
}

export const useContractReadTotalSupply = (contractAddress: string): PropsUseContractReadValue => {
    return useContractReadByValue(contractAddress, "totalSupply");
}

export const useContractReadVestingPeriod = (contractAddress: string): PropsUseContractReadValue => {
    return useContractReadByValue(contractAddress, "vestingPeriod");
}

export const useContractReadVestingProfit= (contractAddress: string): PropsUseContractReadValue => {
    return useContractReadByValue(contractAddress, "vestingProfit");
}

export const useContractReadWithdrawFee= (contractAddress: string): PropsUseContractReadValue => {
    return useContractReadByValue(contractAddress, "withdrawFee");
}


