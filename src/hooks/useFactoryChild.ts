import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import ContestJsonAbi from "../abi/HDCContest.json";


export interface QueryUseFactoryChild {
    asset?: string;
    symbol?: string;
    name?: string;
    lastUpdate?: number;
    lockedProfit?: string;
    totalAssets?: number;
    totalSupply?: number;
    vestingPeriod?: number;
    vestingProfit?: number;
    withdrawFee?: number;
}

export const useFactoryChild = (address?: string): QueryUseFactoryChild => {
    
    const [ asset, setAsset ] = useState<string>();
    const [ lastUpdate, setLastUpdate ] = useState<number>();
    const [ lockedProfit, setLockedProfit ] = useState<string>();
    const [ name, setName ] = useState<string>();
    const [ symbol, setSymbol ] = useState<string>();
    const [ totalAssets, setTotalAssets ] = useState<number>();
    const [ totalSupply, setTotalSupply ] = useState<number>();
    const [ vestingPeriod, setVestingPeriod ] = useState<number>();
    const [ vestingProfit, setVestingProfit ] = useState<number>();
    const [ withdrawFee, setWithdrawFee ] = useState<number>();

    const contractAddress: string = address!;
    const contractAbi: string = JSON.stringify(ContestJsonAbi);

    console.log("Factory address", contractAddress);

    const readAsset = useContractRead({
        addressOrName: contractAddress,
        contractInterface: contractAbi,
        functionName: "asset",
        cacheOnBlock: true,
    });

    const readLastUpdate = useContractRead({
        addressOrName: contractAddress,
        contractInterface: contractAbi,
        functionName: "lastUpdate",
        cacheOnBlock: true,
    });

    const readLockedProfit = useContractRead({
        addressOrName: contractAddress,
        contractInterface: contractAbi,
        functionName: "lockedProfit",
        cacheOnBlock: true,
    });

    const readName = useContractRead({
        addressOrName: contractAddress,
        contractInterface: contractAbi,
        functionName: "name",
        cacheOnBlock: true,
    });

    const readSymbol = useContractRead({
        addressOrName: contractAddress,
        contractInterface: contractAbi,
        functionName: "symbol",
        cacheOnBlock: true,
        cacheTime: 10_000,
    });

    const readTotalAssets = useContractRead({
        addressOrName: contractAddress,
        contractInterface: contractAbi,
        functionName: "totalAssets",
        cacheOnBlock: true,
        cacheTime: 10_000,
    });

    const readTotalSupply = useContractRead({
        addressOrName: contractAddress,
        contractInterface: contractAbi,
        functionName: "totalSupply",
        cacheOnBlock: true,
        cacheTime: 10_000,
    });

    const readVestingPeriod = useContractRead({
        addressOrName: contractAddress,
        contractInterface: contractAbi,
        functionName: "vestingPeriod",        
        cacheOnBlock: true,
        cacheTime: 10_000,
    });

    const readVestingProfit = useContractRead({
        addressOrName: contractAddress,
        contractInterface: contractAbi,
        functionName: "vestingProfit",
        cacheOnBlock: true,
        cacheTime: 10_000,
    })

    const readWithdrawFee = useContractRead({
        addressOrName: contractAddress,
        contractInterface: contractAbi,
        functionName: "withdrawFee",        
        cacheOnBlock: true,
        cacheTime: 10_000,
    });

    useEffect(()=> {        
        if (readAsset.data) setAsset(readAsset.data.toString());
    }, [ readAsset.data ]);

    useEffect(()=> {
        if (readLastUpdate.data) setLastUpdate(Number(readLastUpdate.data.toString()));
    }, [ readLastUpdate.data ]);

    useEffect(()=> {
        if (readLockedProfit.data) setLockedProfit(readLockedProfit.data.toString());
    }, [ readLockedProfit.data ]);    

    useEffect(()=> {
        if (readAsset.data) setAsset(readAsset.data.toString());
    }, [ readAsset.data ]);


    useEffect(()=> {
        if (readName.data) setName(readName.data.toString());
    }, [ readName.data ]);

    useEffect(()=> {
        if (readSymbol.data) setSymbol(readSymbol.data.toString());
    }, [ readSymbol.data ]);

    useEffect(()=> {
        if (readTotalAssets.data) setTotalAssets(Number(readTotalAssets.data.toString()));
    }, [ readTotalAssets.data ]);

    useEffect(()=> {
        if (readTotalSupply.data) setTotalSupply(Number(readTotalSupply.data.toString()));
    }, [ readTotalSupply.data ]);

    useEffect(()=> {
        if (readVestingPeriod.data) setVestingPeriod(Number(readVestingPeriod.data.toString()));
    }, [ readVestingPeriod.data ]);

    useEffect(() => {
        if (readVestingProfit.data) setVestingProfit(Number(readVestingProfit.data.toString()));
    }, [ readVestingProfit.data ]);

    useEffect(()=> {
        if (readWithdrawFee.data) setWithdrawFee(Number(readWithdrawFee.data.toString()));
    }, [ readWithdrawFee.data ]);

    return { 
        asset,
        lastUpdate,
        lockedProfit,
        name,
        symbol,
        totalAssets, 
        totalSupply, 
        vestingPeriod, 
        vestingProfit, 
        withdrawFee,
    }

};
