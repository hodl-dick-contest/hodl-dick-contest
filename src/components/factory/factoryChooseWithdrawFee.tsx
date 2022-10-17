import { Dispatch, useEffect } from "react";
import { useFactoryReadSupportedFees } from "../../hooks/useFactoryRead";
import { ChooseButton } from "../common/chooseButton";
import { ChooseButtonWrapper } from "../common/chooseButtonWrapper";
import { StepperPannel } from "../common/stepperPannel";
import { FactoryAction, FactoryButton, FactoryButtonWrapper, FactoryInput, FactoryTip } from "./factoryHelpers";


interface WithdrawFeeChoice {
    display: string;
    value: string;
}

const withdrawalFeeChoices: Array<WithdrawFeeChoice> = [
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

interface PropsFactoryChooseWithdrawFee {
    withdrawalFee: string;
    setWithdrawlFee: Dispatch<string>;
    onClickBack: () => void;
    onClickNext: () => void;
}

export const FactoryChooseWithdrawalFee = (props: PropsFactoryChooseWithdrawFee) => {

    const withdrawFee = ( Number(props.withdrawalFee) * ( 10 ** 9 ) / 100 ).toString();
    const supportedFees = useFactoryReadSupportedFees(withdrawFee);

    useEffect(() => {
        supportedFees.refetch();
    }, [ withdrawFee ]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <StepperPannel>

            <FactoryAction>
                Choose a Witdrawal Fee
            </FactoryAction>
            
            <FactoryInput
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
                            <ChooseButton 
                                key={ index }
                                onClick={ () => props.setWithdrawlFee(choice.value.toString())} 
                            >
                                { choice.display }
                            </ChooseButton>
                        );
                    })
                }
            </ChooseButtonWrapper>

            <FactoryTip>
                Tip: The higher the fees the more the winner wins but the less users will dare enter the contest.                        
            </FactoryTip>                        
            
            <FactoryButtonWrapper>
                <FactoryButton onClick={ props.onClickBack }>
                    Back
                </FactoryButton>
                <FactoryButton 
                    onClick={ props.onClickNext }
                    disabled={ !( supportedFees.value === "true" && Number(props.withdrawalFee) > 0 && Number(props.withdrawalFee) < 100 ) }
                >
                    Next
                </FactoryButton>
            </FactoryButtonWrapper>
                
        </StepperPannel>
    );
}
