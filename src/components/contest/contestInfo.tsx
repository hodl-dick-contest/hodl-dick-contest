import { ReactElement } from "react";
import { ChartPieIcon, ClockIcon, ArrowPathIcon, BanknotesIcon } from "@heroicons/react/24/outline";
import { useContractReadLastUpdate, useContractReadVestingPeriod, useContractReadVestingProfit, useContractReadWithdrawFee } from "../../hooks/useContractReadContest";
import { ToolTip } from "../common/tooltip";
import { convertSecondsToString } from "../../utils/convertSecondsToString";
import { ComputeCurrentTimeDifference } from "../../utils/computeTimeDifference";


export const ContestInfo = (props: { info: string, icon: ReactElement|null }) => {
    return (
        (props.info) ?
        <div className="
            h-9
            flex flex-row justify-start items-center
            rounded-lg
            border
            border-slate-600
            divide-x divide-slate-600
            "
        >
            <div className="h-9 px-3 py-1 mx-auto">
                { props.icon }
            </div>
            <div className="h-9 min-16 px-3 py-1 text-lg font-normal">
                { props.info }
            </div>
        </div> : null  
    );
}

export const ContestInfoLastUpdate = (props: {contractAddress: string }) => {
    const lastUpdate = useContractReadLastUpdate(props.contractAddress!);
    const displayLastUpdate = (lastUpdate.value) ? ComputeCurrentTimeDifference(Number(lastUpdate.value)*1000) : "";
    return (
        <ToolTip tooltip="When the contest was last updated">
            <ContestInfo
                info={ displayLastUpdate }
                icon={ <ArrowPathIcon className="h-6 w-6 text-slate-100"/> }
            />
        </ToolTip>
    )
}

export const ContestInfoVestingPeriod = (props: {contractAddress: string }) => {
    const vestingPeriod = useContractReadVestingPeriod(props.contractAddress!);    
    const displayVestingPeriod = (vestingPeriod.value) ? convertSecondsToString(Number(vestingPeriod.value)) : "";
    return (
        <ToolTip tooltip="Vesting period">
            <ContestInfo
                info={ displayVestingPeriod }
                icon={ <ClockIcon className="h-6 w-6 text-slate-100"/> }
            />
        </ToolTip>
    )    
}

export const ContestInfoVestingProfit = (props: {contractAddress: string }) => {
    const vestingProfit = useContractReadVestingProfit(props.contractAddress!);
    const displayVestingProfit = (vestingProfit.value) ? vestingProfit.value.toString() : "";
    return (
        <ToolTip tooltip="Profit vested so far">
            <ContestInfo
                info={ displayVestingProfit }
                icon={ <BanknotesIcon className="h-6 w-6 text-slate-100"/> }
            />
        </ToolTip>
    )
}

export const ContestInfoWithdrawFee = (props: {contractAddress: string }) => {
    const withdrawFee = useContractReadWithdrawFee(props.contractAddress!);
    const displayWithdrawFee = (withdrawFee.value) ? ( 100 * Number(withdrawFee.value) / 10**9 ).toString() + " %" : "";
    return (
        <ToolTip tooltip="Withdraw fees charged to user on deposited amount">
            <ContestInfo
                info={ displayWithdrawFee }
                icon={ <ChartPieIcon className="h-6 w-6 text-slate-100"/> }
            />
        </ToolTip>
    )
}



