import { useState, Dispatch, ReactNode } from "react";
import { AddressListbox } from "../common/addressListbox";
import { supportedAssets } from "../../constants";
import { IStep, Stepper } from "../common/stepper";
import { ChooseButton } from "../common/chooseButton";
import { ChooseButtonWrapper } from "../common/chooseButtonWrapper";
import { StepperPannel } from "../common/stepperPannel";
import { useFactoryWriteDeploy } from "../../hooks/useFactoryWrite";
import { useFactoryParams } from "../../hooks/useFactoryParams";
import { TransactionButton } from "../common/transactionButton";
import { useContractReadSymbol } from "../../hooks/useContractReadContest";
import truncateEthAddress from 'truncate-eth-address';


interface PropsContestFactoryInput {
    title?: string;
    placeholder?: string;
    value: string;
    setValue?: Dispatch<string>;
    unit: string;
    type?: string;
    min?: string;
    step?: string; 
}

const vestingPeriodChoices = [
    {
        display: "1 hour",
        value: 3600
    },
    {
        display: "1 day",
        value: 3600*24
    },
    {
        display: "1 week",
        value: 3600*24*7
    },
    {
        display: "1 month",
        value: 3600*24*30
    },
    {
        display: "1 year",
        value: 3600*24*365
    }      
]

const withdrawalFeeChoices = [
    {
        display: "1 %",
        value: "1"
    },
    {
        display: "2 %",
        value: "2"
    },
    {
        display: "5 %",
        value: "5"
    },
    {
        display: "10 %",
        value: "10"
    }
]


const ContestFactoryAction = (props: { children: ReactNode }) => {
    return (
        <div className="py-3 text-xl text-semibold">
            { props.children }
        </div>
    );
}


const ContestFactoryTip = (props: { children: ReactNode }) => {
    return (
        <div className="w-full flex flex-col justify-start items-start gap-2 text-lg text-slate-200 italic">                        
            { props.children }
        </div>
    )
}


const ContestFactoryButton = (props: { children: ReactNode, onClick: () => void, disabled?: boolean }) => {
    return (
        <button 
            onClick={ props.onClick } 
            className={`
                w-full 
                py-2 px-10 
                flex flew-row justify-center items-center
                rounded-lg 
                text-lg 
                font-semibold                
                ${ (props.disabled) ? "bg-slate-900" : "bg-purple-400/60" }
            `}
            disabled={ props.disabled }
        >
            { props.children }
        </button>
    );
}


const ContestFactoryButtonWrapper = (props: { children: ReactNode }) => {
    return (
        <div className="w-full flex flex-row gap-4">
            { props.children }
        </div>
    );
}


const ContestFactoryInput = (props: PropsContestFactoryInput) => {
    return (
        <div className="w-full text-slate-100 text-xl flex flex-col justify-start items-start">
            <div className="w-full relative bg-slate-900 rounded-lg text-slate-100 pl-6 pr-4 py-3 text-xl flex flex-row justify-start items-center">
                <input 
                    className="w-full flex justify-center outline-none bg-transparent text-center"
                    placeholder={ props.placeholder }
                    min={ props.min }
                    step={ props.step }
                    type={ props.type }
                    value={ props.value }
                    onChange={ props.setValue ? (event) => props.setValue!(event.target.value) : undefined }
                />
                <div className="absolute min-w-fit px-4 top-1/4 right-5 italic">
                    { props.unit }
                </div>
            </div>
        </div>
    );
}


const ContestFactoryStart = (props: { onClickStart: () => void }) => {
    return (
        <StepperPannel>

            <div className="py-3 text-xl text-semibold">
                A new contest is about to be launched ! Congrats
            </div>

            <ContestFactoryButtonWrapper>
                <ContestFactoryButton onClick={ props.onClickStart } >
                    Unerstood, let's start
                </ContestFactoryButton>
            </ContestFactoryButtonWrapper>
    
        </StepperPannel>
    );
}


const ContestFactoryAsset = (props: { asset: string, setAsset: Dispatch<string>, onClickNext: () => void, onClickBack: () => void }) => {
    const assetSymbol = useContractReadSymbol(props.asset);
    let symbol: string|undefined;
    if (!assetSymbol.isLoading && !assetSymbol.isError && assetSymbol.value) {
        symbol = assetSymbol.value.toString();
    }
    return (
        <StepperPannel>

            <ContestFactoryAction>
               { ( symbol ) ? `Provided asset ${symbol}` : "Provide an asset" }
            </ContestFactoryAction>

            <ContestFactoryInput 
                title="Or provide the asset you want" 
                placeholder="Asset address"
                value={ props.asset }
                setValue={ props.setAsset }
                unit=""
            />

            <ContestFactoryAction>
                Or, pick on asset out of the list
            </ContestFactoryAction>

            <AddressListbox
                listOfAddress={ supportedAssets }
                setAssetAddress={ props.setAsset }
            />

            <ContestFactoryTip>
                Tip: the more volatile the asset the better.                   
            </ContestFactoryTip>                                    

            <ContestFactoryButtonWrapper>
                <ContestFactoryButton onClick={ props.onClickBack }>
                    Back
                </ContestFactoryButton>
                <ContestFactoryButton onClick={ props.onClickNext } disabled={ ( assetSymbol.isError || !assetSymbol.value ) }>
                    Next
                </ContestFactoryButton>
            </ContestFactoryButtonWrapper>
        
        </StepperPannel>
    );
}


const ContestFactoryVestingPeriod = (
    props: {
        vestingPeriod: string, 
        setVestingPeriod: Dispatch<string>, 
        onClickBack: () => void, 
        onClickNext: () => void
    }) => {
    return (
        <StepperPannel>

            <ContestFactoryAction>
                Choose a vesting period
            </ContestFactoryAction>

            <ContestFactoryInput 
                title="Choose vesting period"
                placeholder="Vesting period"
                value={ props.vestingPeriod }
                setValue={ props.setVestingPeriod }
                unit="seconds"
            />

            <ChooseButtonWrapper>
                { 
                    vestingPeriodChoices.map((choice, index) => {
                        return (
                            <ChooseButton onClick={ () => props.setVestingPeriod(choice.value.toString())} >
                                { choice.display }
                            </ChooseButton>
                        )})
                }
            </ChooseButtonWrapper>

            <ContestFactoryTip>
                Tip: The longer the vesting period, the longer the winner has to wait to access all the profits.                        
            </ContestFactoryTip>

            <ContestFactoryButtonWrapper>
                <ContestFactoryButton onClick={ props.onClickBack }>
                    Back
                </ContestFactoryButton>
                <ContestFactoryButton onClick={ props.onClickNext }>
                    Next
                </ContestFactoryButton>
            </ContestFactoryButtonWrapper>
                
        </StepperPannel>
    );
}


const ContestFactoryWithdrawalFee = (
    props: {
        withdrawalFee: string, 
        setWithdrawlFee: Dispatch<string>, 
        onClickBack: () => void, 
        onClickNext: () => void
    }) => {
    return (
        <StepperPannel>

            <ContestFactoryAction>
                Choose a Witdrawal Fee
            </ContestFactoryAction>
            
            <ContestFactoryInput 
                title="Choose the withdrawl fee"
                placeholder="Withdrawal fee"
                value={ props.withdrawalFee }
                setValue={ props.setWithdrawlFee }
                unit="%"
            />

            <ChooseButtonWrapper>
                { 
                    withdrawalFeeChoices.map((choice, index) => {
                        return (
                            <ChooseButton onClick={ () => props.setWithdrawlFee(choice.value.toString())} key={ index }>
                                { choice.display }
                            </ChooseButton>
                        );
                    })
                }
            </ChooseButtonWrapper>

            <ContestFactoryTip>
                Tip: The higher the fees the more the winner wins but the less users will dare enter the contest.                        
            </ContestFactoryTip>                        
            
            <ContestFactoryButtonWrapper>
                <ContestFactoryButton onClick={ props.onClickBack }>
                    Back
                </ContestFactoryButton>
                <ContestFactoryButton 
                    onClick={ props.onClickNext }
                    disabled={ !( Number(props.withdrawalFee) > 0 && Number(props.withdrawalFee) < 100 ) }
                >
                    Next
                </ContestFactoryButton>
            </ContestFactoryButtonWrapper>
                
        </StepperPannel>
    );
}

const ContestFactoryReview = (
    props: {
        asset: string,
        withdrawalFee: string, 
        vestingPeriod: string,
        onClickBack: () => void, 
        onClickNext: () => void
    }) => {

    const { factoryAddress } = useFactoryParams();
    const { writeContract, transaction } = useFactoryWriteDeploy(
        factoryAddress, props.asset, (Number(props.withdrawalFee) / 100 * (10**9)).toString(), props.vestingPeriod, 3000000 
    );

    return (
        <StepperPannel>

            <ContestFactoryAction>
                Review your contest 😁
            </ContestFactoryAction>

            <div className="w-full flex-row justify-start items-start overflow-hidden border rounded-lg border-slate-100">

                <div className="py-2 w-full flex flex-row justify-between items-center text-lg">
                    <div className="pl-4 py-2 min-w-fit text-left ">
                        Asset
                    </div>
                    <div className="pr-4 py-2 w-full text-right font-mono">
                        { truncateEthAddress(props.asset) }
                    </div>
                </div>

                <div className="py-2 w-full flex flex-row justify between items-center text-lg">
                    <div className="pl-4 min-w-fit text-left ">
                        Vesting period
                    </div>
                    <div className="pr-4 py-2 w-full text-right font-mono">
                        { props.vestingPeriod + " seconds"}
                    </div>
                </div>

                <div className="py-2 w-full flex flex-row justify between items-center text-lg">
                    <div className="pl-4 min-w-fit text-left ">
                        Withdrawal fees
                    </div>
                    <div className="pr-4 py-2 w-full text-right font-mono">
                        { props.withdrawalFee + " %"}
                    </div>
                </div>

            </div>

            <ContestFactoryAction>
                Are you ready ? Let's go 🚀
            </ContestFactoryAction>
 
            <ContestFactoryButtonWrapper>
                
                <ContestFactoryButton onClick={ props.onClickBack }>
                    Back
                </ContestFactoryButton>

                <TransactionButton
                    onClick={ (transaction.isSuccess) ? () => { writeContract.reset(); props.onClickNext() } : () => { writeContract.write?.() } }
                    disabled={ !writeContract.write }
                    isError={ writeContract.isError || transaction.isError }
                    isWaiting={ ( writeContract.isLoading || writeContract.isSuccess ) && transaction.isLoading }
                    isSuccess={ transaction.isSuccess }
                >
                    Launch
                </TransactionButton>

            </ContestFactoryButtonWrapper>
                
        </StepperPannel>
    );
}


export const ContestFactory = (props: { closeModal: () => void }) => {

    const steps: Array<IStep> = [
        { id: "1", name: "Assets", href: "#", status: "complete" },
        { id: "2", name: "Withdrawal fees", href: "#", status: "complete" },
        { id: "3", name: "Vesting period", href: "#", status: "current" },
    ]

    const [ selected, setSelected ] = useState<number>(-1);
    const [ asset, setAsset ] = useState<string>("");
    const [ withdrawalFee, setWithdrawlFee ] = useState<string>( "1" );
    const [ vestingPeriod, setVestingPeriod ] = useState<string>( "3600" );

    const increaseSelected = () => {
        if (selected === steps.length ) {
            setSelected(-1);
        } else {
            setSelected(selected+1);
        }
    }

    const decreaseSelected = () => {
        if (selected === -1) return ;
        setSelected(selected-1);
    }

    let content: ReactNode = "";

    switch (selected) {
        case -1:
            content = <ContestFactoryStart onClickStart={ increaseSelected }/>
            break;
        case 0:
            content = <ContestFactoryAsset
                asset={ asset }
                setAsset={ setAsset }
                onClickBack={ decreaseSelected }
                onClickNext={ increaseSelected }
            />
            break;
        case 1:
            content = <ContestFactoryWithdrawalFee 
                withdrawalFee={ withdrawalFee }
                setWithdrawlFee={ setWithdrawlFee }
                onClickBack={ decreaseSelected }
                onClickNext={ increaseSelected }
            />
                
            break;    
        case 2:
            content = <ContestFactoryVestingPeriod 
                vestingPeriod={ vestingPeriod }
                setVestingPeriod={ setVestingPeriod }
                onClickBack={ decreaseSelected }
                onClickNext={ increaseSelected }
            />
            break
        case 3:
            content = <ContestFactoryReview 
                withdrawalFee={ withdrawalFee }
                vestingPeriod={ vestingPeriod }
                asset={ asset }
                onClickBack={ decreaseSelected }
                onClickNext={ props.closeModal }
            />
            break;            
        default:
            console.log("This should not happen");
    }

    return (
        <div className="w-[40rem] flex flex-col justify-start items-start px-8 py-8 text-slate-100 gap-4 bg-slate-800">
            <div className="w-fill text-3xl my-2">
                Create a new contest
            </div>
            <Stepper steps={ steps } currentIndex={ selected } />
            { content }
        </div>
    );

}