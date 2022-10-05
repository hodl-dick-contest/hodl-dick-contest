import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useContractReadAsset, 
    useContractReadName, 
    useContractReadSymbol, 
    useContractReadTotalAssets, 
    useContractReadTotalSupply 
} from "../../hooks/useContractReadContest";

import { ContestInfoLastUpdate, 
    ContestInfoVestingPeriod, 
    ContestInfoVestingProfit, 
    ContestInfoWithdrawFee 
} from "./contestInfo";
import { ContestAssetSymbol } from "./contestAssetSymbol";


export const ContestView = (props: { address: string }) => {

    const naviguate = useNavigate();

    const asset = useContractReadAsset(props.address);
    const assetSymbol = useContractReadSymbol(asset.value!);
    const name = useContractReadName(props.address);
    const symbol = useContractReadSymbol(props.address);

    const totalAssets = useContractReadTotalAssets(props.address!);
    const totalSupply = useContractReadTotalSupply(props.address!);
    const displayTotalAssets = (totalAssets.value) ? ethers.utils.formatEther(totalAssets.value) : "";
    const displayTotalSupply = (totalSupply.value) ? ethers.utils.formatEther(totalSupply.value) : "";

    return (
        <div className="
            w-full
            px-8
            my-3 
            py-3
            flex flex-col justify-between items-start gap-4
            bg-slate-800
            rounded-lg
            transition easy-in-out duration-150 hover:scale-[1.02]
            "
            onClick={ () => naviguate("/contest/" + props.address )}
        >

            <div className="py-2 text-2xl text-slate-100">
                { name.value ? name.value : "" }
            </div>

            <div className="
                w-full
                flex flex-row justify-start items-center
                text-slate-100
                overflow-hidden
                border border-slate-600 rounded-lg
                divide-x divide-slate-600
                "
            >

                <ContestAssetSymbol 
                    symbol={ assetSymbol.value ? assetSymbol.value : "" }
                    assetAddress={ asset.value! }
                    totalAssetOrSupply={ displayTotalAssets }
                    isContest={ false }
                />

                <ContestAssetSymbol 
                    symbol={ symbol.value ? symbol.value : "" }
                    assetAddress={ props.address }
                    totalAssetOrSupply={ displayTotalSupply }
                    isContest={ true }
                />
                
            </div>

            <div className="w-full flex flex-row justify-start items-start text-slate-100 gap-4">            
                <ContestInfoVestingPeriod contractAddress={ props.address! } />
                <ContestInfoWithdrawFee contractAddress={ props.address! } />
                <ContestInfoLastUpdate contractAddress={ props.address! }/>
                <ContestInfoVestingProfit contractAddress={ props.address! } />
            </div>

        </div>
    );
}
