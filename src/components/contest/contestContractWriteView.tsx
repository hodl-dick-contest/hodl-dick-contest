import { Dispatch } from "react";
import { ArrowPathIcon, CheckCircleIcon, ExclamationCircleIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";


export interface PropsContestContractWriteView {
    label: string;
    name: string;
    value: any;
    setValue: Dispatch<any>;
    onClick: () => void;
    disabled: boolean;
    isError: boolean;
    isSucces: boolean;
    isWaiting: boolean;
}

export const ContestContractWriteView = (props: PropsContestContractWriteView) => {

    let icon;
    if ( props.isError ) {        
        icon = <ExclamationCircleIcon className="w-5 h-5 m-1 animate-bounce"/>
    } else if ( props.isWaiting ) {
        icon = <ArrowPathIcon className="w-5 h-5 m-1 animate-spin"/>
    } else if ( props.isSucces ) {
        icon = <CheckCircleIcon className="w-5 h-5 m-1"/>
    } else {        
        icon = <PaperAirplaneIcon className="w-5 h-5 m-1"/> ;
    }

    return (
        <div className="w-full px-4 py-3 bg-slate-800 flex flex-row justify-start items-center gap-4 rounded-lg group">

            <div className="min-w-fit text-base font-semibold">
                <div className="inline-block">
                    { props.label }
                </div>
            </div>

            <div className="w-full flex flex-row justify0start items-center gap-2">
                <div className="w-16 font-mono text-sm text-right">
                    ETH
                </div>
                <input className="
                    w-full
                    px-4
                    py-1
                    flex 
                    text-left
                    text-slate-100
                    bg-transparent
                    rounded-lg
                    outline-none
                    font-mono font-light
                    text-sm
                    "   
                    type="number"
                    step="0.001"
                    min="0"
                    value={ props.value }
                    onChange={ props.setValue } 
                />
            </div>

            <button 
                className="min-w-fit flex flex-row items-center justify-start gap-4 text-normal text-left font-semibold rounded-lg bg-slate-600 py-[0.5] px-3 hover:bg-purple-400/60"
                onClick={ props.onClick }
                disabled={ props.disabled }
            >
                <div className="inline-block">
                    { props.name }
                </div>
                <div 
                    className="m-1 p-1 rounded-full bg-slate-600"                    
                >                        
                    { icon }
                </div>

            </button>


        </div>
    )
}