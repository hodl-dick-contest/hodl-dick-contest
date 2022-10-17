import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useContractReadAsset, 
    useContractReadName, 
    useContractReadSymbol, 
    useContractReadTotalSupply 
} from "../../hooks/useContractReadContest";

import { ContestInfoLastUpdate, 
    ContestInfoVestingPeriod, 
    ContestInfoTvl, 
    ContestInfoWithdrawFee 
} from "./contestInfo";

import { ContestAssetSymbol } from "./contestAssetSymbol";


export const ContestView = (props: { address: string }) => {

    const naviguate = useNavigate();

    const asset = useContractReadAsset(props.address);
    const assetSymbol = useContractReadSymbol(asset.value!);
    const name = useContractReadName(props.address);
    const symbol = useContractReadSymbol(props.address);

    const totalSupply = useContractReadTotalSupply(props.address!);    
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

            <div className="
                w-full
                flex flex-row justify-between items-center gap-4
                text-slate-100
                overflow-hidden
                "
                // border border-slate-600 rounded-lg
                // divide-x divide-slate-600                
            >


                <div className="py-2 text-xl text-slate-100">
                    { name.value ? name.value : "" }
                </div>

                <ContestAssetSymbol 
                    symbol={ symbol.value ? symbol.value : "" }
                    baseSymbol={ assetSymbol.value ? assetSymbol.value : "" }
                    assetAddress={ props.address }
                    totalAssetOrSupply={ displayTotalSupply }
                    isContest={ true }
                />
                
            </div>

            <div className="w-full flex flex-row justify-start items-start text-slate-100 gap-4">            
                <ContestInfoVestingPeriod contractAddress={ props.address! } />
                <ContestInfoWithdrawFee contractAddress={ props.address! } />
                <ContestInfoLastUpdate contractAddress={ props.address! }/>
                <ContestInfoTvl contractAddress={ props.address! } />
            </div>

        </div>
    );
}
