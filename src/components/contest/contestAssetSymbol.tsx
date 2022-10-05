import { WrapIcon } from "../common/wrapIcon";
import { EthereumIcon } from "../../icons/blockchainIcon";


interface PropsContestAssetSymbol {
    symbol: string;
    assetAddress: string;
    totalAssetOrSupply: string;
    isContest: boolean;
}

export const ContestAssetSymbol = (props: PropsContestAssetSymbol) => {
    return (
        <div className="
            w-full
            mx-auto
            pt-8
            pb-4
            px-4
            flex flex-col justify-start items-center gap-2
            group     
            "
        >
            
            <div>
                {
                    (props.isContest === true) ?
                    <WrapIcon>
                        <div className="rounded-full bg-slate-700 p-4">
                            <EthereumIcon isBig={ true } /> 
                        </div>
                    </WrapIcon> :
                    <div className="rounded-full bg-slate-700 p-4">                    
                        <EthereumIcon isBig={ true } />
                    </div>
                }
            </div>
            
            <div className="text-xl">
                { props.symbol }
            </div>

            <div className="h-6">
                <div className="hidden group-hover:flex text-sm">
                    { props.totalAssetOrSupply }
                </div>
            </div>

        </div>
    );
}