import { useState, Dispatch } from "react";
import { BigNumber } from "ethers";
import { useContractReadPreviewDeposit, useContractReadPreviewWithdraw } from "../../hooks/useContractReadContest";


export interface PropsContestPreview {
    label: string;
    value?: string|number;
    fetched?: string|number;
    updateValue: Dispatch<string>
}

export const ContestUserPreview = (props: PropsContestPreview) => {
    return (
        <div className="py-4 px-8 flex flex-row justify-between items-center">
            
             <div className="
                w-1/3 
                flex justify-start
                text-left
                text-sm
                text-slate-100 
                font-light
                "
            >
                { props.label }
            </div>

            <input className="
                px-2
                w-1/4 
                flex
                text-sm
                text-right 
                text-slate-100 
                bg-slate-600 
                rounded-lg 
                outline-none hover:outline-slate-100 hover:outline-1 
                font-light
                " 
                value={ props.value }
                onChange={ (event) => props.updateValue(event.target.value.toString())} 
            />
       
            <div className="
                w-1/3 
                flex justify-end
                text-sm
                text-right
                text-slate-100 
                font-light
                "
            >
                { ( props.fetched !== undefined ) ? props.fetched : null }
            </div>

        </div>
    );
}

export const ContestUserPreviewDeposit = (props: { address?: string }) => {

    const [userPreviewDeposit, setUserPreviewDeposit] = useState<BigNumber>(BigNumber.from("1000000000"));
    const previewDeposit = useContractReadPreviewDeposit(props.address!, userPreviewDeposit);

    return (
        <ContestUserPreview
            label={ "Preview deposit" }
            value={ userPreviewDeposit.toString() }
            updateValue={ (item: string) => setUserPreviewDeposit(BigNumber.from(item)) }
            fetched={ (!previewDeposit.isLoading && !previewDeposit.isError ) ? previewDeposit.value: "" }
        />
    );
}


export const ContestUserPreviewWithdraw = (props: { address?: string }) => {

    const [userPreviewWithdraw, setUserPreviewDeposit] = useState<BigNumber>(BigNumber.from("1000000000"));
    const previewWithdraw = useContractReadPreviewWithdraw(props.address!, userPreviewWithdraw);

    return (
        <ContestUserPreview
            label={ "Preview withdraw" }
            value={ userPreviewWithdraw.toString() }
            updateValue={ (item: string) => setUserPreviewDeposit(BigNumber.from(item)) }
            fetched={ (!previewWithdraw.isLoading && !previewWithdraw.isError ) ? previewWithdraw.value : "" }
        />
    );
}
