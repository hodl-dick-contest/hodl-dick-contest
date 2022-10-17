import { ReactElement } from "react";
import { ethers } from "ethers";
import { ChartPieIcon, ClockIcon, ArrowPathIcon, BanknotesIcon } from "@heroicons/react/24/outline";

import { 
    useContractReadDecimals,
    useContractReadLastUpdate, 
    useContractReadTotalAssets, 
    useContractReadVestingPeriod, 
    useContractReadWithdrawFee 
} from "../../hooks/useContractReadContest";

import { ToolTip } from "../common/tooltip";
import { convertSecondsToString } from "../../utils/convertSecondsToString";
import { ComputeCurrentTimeDifference } from "../../utils/computeTimeDifference";


export const ContestInfo = (props: { info: string, icon: ReactElement|null }) => {
    return (
        (props.info) ?
        <div className="
            h-8
            flex flex-row justify-start items-center
            rounded-lg
            border
            border-slate-600
            bg-slate-900
            divide-x divide-slate-600
            "
        >
            <div className="h-full flex items-center justify-center px-3 py-1 mx-auto">
                { props.icon }
            </div>
            <div className="h-full flex items-center justify-center min-16 px-3 py-1 text-sm font-normal">
                { props.info }
            </div>
        </div> : null  
    );
}

export const ContestInfoLastUpdate = (props: {contractAddress: string }) => {
    const lastUpdate = useContractReadLastUpdate(props.contractAddress!);
    const displayLastUpdate = (lastUpdate.value) ? ComputeCurrentTimeDifference(Number(lastUpdate.value)*1000) : "";
    if (lastUpdate.value === "0") {
        return null;
    } else {
        return (
            <ToolTip tooltip="When the contest was last updated">
                <ContestInfo
                    info={ displayLastUpdate }
                    icon={ <ArrowPathIcon className="h-6 w-6 text-slate-100"/> }
                />
            </ToolTip>
        );
    }
}

export const ContestInfoVestingPeriod = (props: {contractAddress: string }) => {
    const vestingPeriod = useContractReadVestingPeriod(props.contractAddress!);    
    const displayVestingPeriod = (vestingPeriod.value) ? convertSecondsToString(Number(vestingPeriod.value)) : "";
    return (
        <ToolTip tooltip="Time during which profits made on other users withdrawing are vested">
            <ContestInfo
                info={ displayVestingPeriod }
                icon={ <ClockIcon className="h-5 w-5 text-slate-100"/> }
            />
        </ToolTip>
    );
}

export const ContestInfoTvl = (props: {contractAddress: string }) => {
    const totalAssets = useContractReadTotalAssets(props.contractAddress!);
    const decimals = useContractReadDecimals(props.contractAddress!);    
    if ( !totalAssets.value || !decimals.value ) {
        return null
    } else {
        const tvl = Number(ethers.utils.formatUnits(totalAssets.value, decimals.value));
        if (tvl < 0.0001) { 
            return (
                <ToolTip tooltip={`Total value locked ${ tvl}`}>
                    <ContestInfo
                        info={ "~0" }
                        icon={ <BanknotesIcon className="h-5 w-5 text-slate-100"/> }
                    />
                </ToolTip>
            );
        } else {
            return (
                <ToolTip tooltip={`Total value locked ${ tvl}`}>
                    <ContestInfo
                        info={ tvl.toFixed(4) }
                        icon={ <BanknotesIcon className="h-5 w-5 text-slate-100"/> }
                    />
                </ToolTip>
            );
        }
    }
}

export const ContestInfoWithdrawFee = (props: {contractAddress: string }) => {
    const withdrawFee = useContractReadWithdrawFee(props.contractAddress!);
    const displayWithdrawFee = (withdrawFee.value) ? ( 100 * Number(withdrawFee.value) / 10**9 ).toString() + " %" : "";
    return (
        <ToolTip tooltip="Withdrawal fee paid when removing tokens from the contest">
            <ContestInfo
                info={ displayWithdrawFee }
                icon={ <ChartPieIcon className="h-5 w-5 text-slate-100"/> }
            />
        </ToolTip>
    );
}



