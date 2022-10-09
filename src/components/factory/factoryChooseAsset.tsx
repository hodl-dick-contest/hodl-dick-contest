import { Dispatch } from "react";
import { supportedAssets } from "../../constants";
import { useContractReadSymbol } from "../../hooks/useContractReadContest";
import { AddressListbox } from "../common/addressListbox";
import { StepperPannel } from "../common/stepperPannel";
import { FactoryAction, FactoryButton, FactoryButtonWrapper, FactoryInput, FactoryTip } from "./factoryHelpers";


interface PropsFactoryChooseAsset {
    asset: string;
    setAsset: Dispatch<string>;
    onClickNext: () => void;
    onClickBack: () => void;
}


export const FactoryChooseAsset = (props: PropsFactoryChooseAsset) => {
    
    const assetSymbol = useContractReadSymbol(props.asset);
    
    let symbol: string|undefined;
    
    if (!assetSymbol.isLoading && !assetSymbol.isError && assetSymbol.value) {
        symbol = assetSymbol.value.toString();
    }

    return (
        <StepperPannel>

            <FactoryAction>
               { ( symbol ) ? `Provided asset ${symbol}` : "Provide an asset" }
            </FactoryAction>

            <FactoryInput 
                title="Or provide the asset you want" 
                placeholder="Asset address"
                value={ props.asset }
                setValue={ props.setAsset }
                unit=""
            />

            <FactoryAction>
                Or, pick on asset out of the list
            </FactoryAction>

            <AddressListbox
                listOfAddress={ supportedAssets }
                setAssetAddress={ props.setAsset }
            />

            <FactoryTip>
                Tip: the more volatile the asset the better.                   
            </FactoryTip>                                    

            <FactoryButtonWrapper>
                <FactoryButton onClick={ props.onClickBack }>
                    Back
                </FactoryButton>
                <FactoryButton onClick={ props.onClickNext } disabled={ ( assetSymbol.isError || !assetSymbol.value ) }>
                    Next
                </FactoryButton>
            </FactoryButtonWrapper>
        
        </StepperPannel>
    );
}
