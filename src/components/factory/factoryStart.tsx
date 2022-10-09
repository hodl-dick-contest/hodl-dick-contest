import { StepperPannel } from "../common/stepperPannel";
import { FactoryButton, FactoryButtonWrapper } from "./factoryHelpers";


export const FactoryStart = (props: { onClickStart: () => void }) => {
    return (
        <StepperPannel>

            <div className="py-3 text-xl text-semibold">
                A new contest is about to be launched ! Congrats
            </div>

            <FactoryButtonWrapper>
                <FactoryButton onClick={ props.onClickStart } >
                    Unerstood, let's start
                </FactoryButton>
            </FactoryButtonWrapper>
    
        </StepperPannel>
    );
}
