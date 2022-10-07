import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { ethers } from "ethers";


export interface PropsContestCurrentValueView {
    label: string;
    value: any;
    isRefetching: boolean;
    refetch: () => void;
}


export const ContestCurrentValueview = (props: PropsContestCurrentValueView) => {
    const [unit, setUnit] = useState<string>("eth");

    const convertValueBasedOnUnit = (value?: string): string => {
        if (!unit) {
            return unit;
        } else if (unit === "wei") {
            return value!;
        } else if (unit === "gwei") {
            return ethers.utils.formatUnits(value!, unit);
        } else if (unit === "eth") {
            return ethers.utils.formatEther(value!.toString());
        } else {
            return value!;
        }
    }

    return(
        <div className="h-11
            w-full px-4 py-2 bg-slate-800 flex flex-row justify-between items-center gap-2 rounded-lg text-base
            "
        >
            
            <div className="grow text-normal text-right rounded-lg px-2 py-[0.5] mx-2 font-mono text-sm">
                { (props.value ) ? convertValueBasedOnUnit(props.value.toString()) : props.value }
            </div>

            <button onClick={ props.refetch } className="p-[0.5] rounded-full bg-slate-600">
                {
                    (props.isRefetching) ?
                    <ArrowPathIcon className="w-5 h-5 m-1 animate-spin"/> :
                    <ArrowPathIcon className="w-5 h-5 m-1 "/>
                }
            </button>

        </div>
    );
}

export const ContestCurrentValueview2 = (props: PropsContestCurrentValueView) => {
    return(
        <div className="h-11
            w-full px-4 py-2 bg-slate-800 flex flex-row justify-between items-center gap-2 rounded-lg text-base
            "
        >
            
            <div className="flex text-normal text-left font-semibold">
                { props.label }
            </div>

            <div className="grow text-normal text-right rounded-lg px-2 py-1 mx-2 font-mono text-sm">
                { props.value }
            </div>

            <button onClick={ props.refetch } className="p-[0.5] rounded-full bg-slate-600">
                {
                    (props.isRefetching) ?
                    <ArrowPathIcon className="w-5 h-5 m-1 animate-spin"/> :
                    <ArrowPathIcon className="w-5 h-5 m-1 "/>
                }
            </button>

        </div>
    );
}