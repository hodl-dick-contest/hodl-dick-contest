import { useEffect, Dispatch } from "react";
import { useFactoryReadSupportedVestingPeriods } from "../../hooks/useFactoryRead";
import { ChooseButton } from "../common/chooseButton";
import { ChooseButtonWrapper } from "../common/chooseButtonWrapper";
import { StepperPannel } from "../common/stepperPannel";
import { FactoryAction, FactoryButtonWrapper, FactoryInput, FactoryTip, FactoryButton } from "./factoryHelpers";


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
];


interface PropsFactoryChooseVestingPeriod {
    vestingPeriod: string;
    setVestingPeriod: Dispatch<string>;
    onClickBack: () => void;
    onClickNext: () => void;
}


export const FactoryChooseVestingPeriod = (props: PropsFactoryChooseVestingPeriod) => {

    const supportedVestingPeriod = useFactoryReadSupportedVestingPeriods(props.vestingPeriod);

    useEffect(() => {
        supportedVestingPeriod.refetch()
    }, [ props.vestingPeriod ]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <StepperPannel>

            <FactoryAction>
                Choose a vesting period
            </FactoryAction>

            <FactoryInput
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
                            <ChooseButton 
                                key={ index } 
                                onClick={ () => props.setVestingPeriod(choice.value.toString()) } 
                            >
                                { choice.display }
                            </ChooseButton>
                        )})
                }
            </ChooseButtonWrapper>

            <FactoryTip>
                Tip: The longer the vesting period, the longer the winner has to wait to access all the profits.                        
            </FactoryTip>

            <FactoryButtonWrapper>
                <FactoryButton 
                    onClick={ props.onClickBack }
                >
                    Back
                </FactoryButton>
                <FactoryButton 
                    onClick={ props.onClickNext } 
                    disabled={ !( supportedVestingPeriod.value === "true" && Number(props.vestingPeriod) > 0 ) }
                >
                    Next
                </FactoryButton>
            </FactoryButtonWrapper>
                
        </StepperPannel>
    );
}
