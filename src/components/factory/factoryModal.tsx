import { useState, ReactNode } from "react";
import { IStep, Stepper } from "../common/stepper";
import { FactoryStart } from "./factoryStart";
import { FactoryChooseAsset } from "./factoryChooseAsset";
import { FactoryChooseWithdrawalFee } from "./factoryChooseWithdrawFee";
import { FactoryChooseVestingPeriod } from "./factoryChooseVestingPeriod";
import { FactoryDeployReview } from "./factoryDeployReview";


export const FactoryModal = (props: { closeModal: () => void }) => {

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
        if (selected === -1) return;
        setSelected(selected-1);
    }

    let content: ReactNode = "";

    switch (selected) {
        case -1:
            content = <FactoryStart onClickStart={ increaseSelected }/>
            break;
        case 0:
            content = <FactoryChooseAsset
                asset={ asset }
                setAsset={ setAsset }
                onClickBack={ decreaseSelected }
                onClickNext={ increaseSelected }
            />
            break;
        case 1:
            content = <FactoryChooseWithdrawalFee
                withdrawalFee={ withdrawalFee }
                setWithdrawlFee={ setWithdrawlFee }
                onClickBack={ decreaseSelected }
                onClickNext={ increaseSelected }
            />                
            break;    
        case 2:
            content = <FactoryChooseVestingPeriod
                vestingPeriod={ vestingPeriod }
                setVestingPeriod={ setVestingPeriod }
                onClickBack={ decreaseSelected }
                onClickNext={ increaseSelected }
            />
            break
        case 3:
            content = <FactoryDeployReview
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