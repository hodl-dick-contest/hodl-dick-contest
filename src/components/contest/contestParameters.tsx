import { useContractReadAsset, useContractReadLastUpdate, useContractReadLockProfit, useContractReadTotalAssets, useContractReadTotalSupply, useContractReadVestingPeriod, useContractReadVestingProfit, useContractReadWithdrawFee  } from "../../hooks/useContractReadContest";
import { convertSecondsToString } from "../../utils/convertSecondsToString";
import { ContestItemsWarpper } from "./contestItemsWrapper";
import { ContestParameter } from "./contestParameter";


export const ContestParameters = (props: {contractAddress: string}) => {

    const asset = useContractReadAsset(props.contractAddress);
    const lastUpdate = useContractReadLastUpdate(props.contractAddress);
    const lockProfit = useContractReadLockProfit(props.contractAddress);
    const totalAssets = useContractReadTotalAssets(props.contractAddress);
    const totalSupply = useContractReadTotalSupply(props.contractAddress);
    const vestingPeriod = useContractReadVestingPeriod(props.contractAddress);
    const vestingProfit = useContractReadVestingProfit(props.contractAddress);
    const withdrawFee = useContractReadWithdrawFee(props.contractAddress);

    let duration;
    if (vestingPeriod.value) {
        duration = convertSecondsToString(Number(vestingPeriod.value));
    }

    return (
        <ContestItemsWarpper>

            <ContestParameter
                label={ "Asset" }
                value={ asset.value }
                isLoading={ asset.isLoading }
                isError={ asset.isError }
            />

            <ContestParameter 
                label={ "Last update" }
                value={ lastUpdate.value }
                isLoading={ lastUpdate.isLoading }
                isError={ lastUpdate.isError }
            />

            <ContestParameter 
                label={ "Locked Profit" }
                value={ lockProfit.value }
                isLoading={ lockProfit.isLoading }
                isError={ lockProfit.isError }                
            />                    

            <ContestParameter 
                label={ "Total assets" }
                value={ totalAssets.value }
                isLoading={ totalAssets.isLoading }
                isError={ totalAssets.isError }         
            />

            <ContestParameter 
                label={ "Total supply" }
                value={ totalSupply.value }
                isLoading={ totalSupply.isLoading }
                isError={ totalSupply.isError }        
            />

            <ContestParameter 
                label={ "Vesting period" }
                value={ (duration !== undefined) ? duration : "" }
                isLoading={ vestingPeriod.isLoading }
                isError={ vestingPeriod.isError }
            />

            <ContestParameter 
                label={ "Vesting profit" }
                value={ vestingProfit.value }
                isLoading={ vestingProfit.isLoading }
                isError={ vestingProfit.isError }                    
            />

            <ContestParameter 
                label={ "Witdraw Fee" }
                value={ (100 * Number(withdrawFee.value)/1000000000).toString() + " %"  }
                isLoading={ withdrawFee.isLoading }
                isError={ withdrawFee.isError }       
            />

        </ContestItemsWarpper>
    );
}