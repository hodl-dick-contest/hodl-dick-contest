import { useContractReadAsset, useContractReadLastUpdate, useContractReadLockProfit, useContractReadTotalAssets, useContractReadTotalSupply, useContractReadVestingPeriod, useContractReadVestingProfit, useContractReadWithdrawFee  } from "../../hooks/useContractReadContest";
import { ContestItemsWarpper } from "./contestItemsWrapper";
import { ContestParameter } from "./contestParameter";

function secondsToHms(secs: string) {
    let d = Number(secs);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours ") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? " minute " : " minutes ") : "";
    var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay; 
}


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
        duration = secondsToHms(vestingPeriod.value);
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
                label={ "Last Update" }
                value={ lastUpdate.value }
                isLoading={ lastUpdate.isLoading }
                isError={ lastUpdate.isError }
            />

            <ContestParameter 
                label={ "Locked Profite" }
                value={ lockProfit.value }
                isLoading={ lockProfit.isLoading }
                isError={ lockProfit.isError }                
            />                    

            <ContestParameter 
                label={ "Tota assets" }
                value={ totalAssets.value }
                isLoading={ totalAssets.isLoading }
                isError={ totalAssets.isError }         
            />

            <ContestParameter 
                label={ "Tota supply" }
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
                value={ withdrawFee.value }
                isLoading={ withdrawFee.isLoading }
                isError={ withdrawFee.isError }       
            />

        </ContestItemsWarpper>
    );
}