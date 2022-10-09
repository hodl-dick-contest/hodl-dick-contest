import truncateEthAddress from 'truncate-eth-address';
import { useFactoryParams } from "../../hooks/useFactoryParams";
import { useFactoryWriteDeploy } from "../../hooks/useFactoryWrite";
import { StepperPannel } from "../common/stepperPannel";
import { TransactionButton } from "../common/transactionButton";
import { FactoryAction, FactoryButton, FactoryButtonWrapper } from "./factoryHelpers";


interface PropsFactoryDeployReview {
    asset: string;
    withdrawalFee: string;
    vestingPeriod: string;
    onClickBack: () => void;
    onClickNext: () => void;
}


export const FactoryDeployReview = (props: PropsFactoryDeployReview) => {

    const withrawFeeToSend = (Number(props.withdrawalFee) / 100 * (10**9)).toString()

    const { factoryAddress } = useFactoryParams();
    const { writeContract, transaction } = useFactoryWriteDeploy(factoryAddress, props.asset, withrawFeeToSend, props.vestingPeriod, 3000000);

    return (
        <StepperPannel>

            <FactoryAction>
                Review your contest 😁
            </FactoryAction>

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

            <FactoryAction>
                Are you ready ? Let's go 🚀
            </FactoryAction>
 
            <FactoryButtonWrapper>
                
                <FactoryButton onClick={ props.onClickBack }>
                    Back
                </FactoryButton>

                <TransactionButton
                    onClick={ (transaction.isSuccess) ? () => { writeContract.reset(); props.onClickNext() } : () => { writeContract.write?.() } }
                    disabled={ !writeContract.write }
                    isError={ writeContract.isError || transaction.isError }
                    isWaiting={ ( writeContract.isLoading || writeContract.isSuccess ) && transaction.isLoading }
                    isSuccess={ transaction.isSuccess }
                >
                    Launch
                </TransactionButton>

            </FactoryButtonWrapper>
                
        </StepperPannel>
    );
}
