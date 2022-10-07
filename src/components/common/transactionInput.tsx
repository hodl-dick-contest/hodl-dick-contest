import { Dispatch } from "react";


export interface PropsContestContractWriteView {
    value: any;
    setValue: Dispatch<any>;
}

export const TransactionInput = (props: PropsContestContractWriteView) => {
    return (
        <div className="w-full flex flex-row justify-start items-center gap-2">
            <input className="
                w-full
                py-4
                px-4                
                flex 
                text-center
                text-slate-100
                bg-transparent
                rounded-lg
                outline-none
                font-mono 
                font-light
                text-base
                "   
                type="number"
                step="0.001"
                min="0"
                value={ props.value }
                onChange={ props.setValue } 
            />
        </div>
    )
}