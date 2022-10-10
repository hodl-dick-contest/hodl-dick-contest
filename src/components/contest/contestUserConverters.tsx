import { useState } from "react";
import { useContractReadConvertToAssets, useContratReadConvertToShares } from "../../hooks/useContractReadContest";
import { ContestUserPreview } from "./contestUserPreviews";
import { BigNumber } from "ethers";


export const ContestUserConvertToAssets = (props: { address?: string }) => {
    const [ userShares, setUserShares] = useState<BigNumber>(BigNumber.from("1"));
    const converter = useContractReadConvertToAssets(props.address!, userShares.toString());
    return (
        <ContestUserPreview
            label={ "Convert shares to asset" }
            value={ userShares.toNumber().toString() }
            updateValue={ (item: string) => setUserShares(BigNumber.from(item)) }
            fetched={ (!converter.isLoading && !converter.isError ) ? converter.value : "" }
        />
    );
}

export const ContestUserConvertToShares = (props: { address?: string }) => {
    const [ userAssets, setUserAssets] = useState<BigNumber>(BigNumber.from(1));
    const converter = useContratReadConvertToShares(props.address!, userAssets);
    return (
        <ContestUserPreview
            label={ "Convert assets to shares" }
            value={ userAssets.toNumber().toString() }
            updateValue={ (item: string) => setUserAssets(BigNumber.from(item)) }
            fetched={ (!converter.isLoading && !converter.isError ) ? converter.value : "" }
        />
    );
}
