import { WrapIcon } from "../common/wrapIcon";
import { BitcoinIcon, EthereumIcon, PolygonIcon } from "../../icons/blockchainIcon";


interface PropsContestAssetSymbol {
    symbol: string;
    baseSymbol: string;
    assetAddress: string;
    totalAssetOrSupply: string;
    isContest: boolean;
}

export const ContestAssetSymbol = (props: PropsContestAssetSymbol) => {

    if (!props.baseSymbol) return null;
    
    let symbol;
    if (props.baseSymbol === "WETH") {
        symbol = <EthereumIcon />;
    } else if (props.baseSymbol === "WBTC") {
        symbol = <BitcoinIcon />;
    } else {
        symbol = <PolygonIcon />;
    }


    return (
        <div className="
        flex flex-col justify-start items-center gap-2
        group
        rounded-lg
        overflow-hidden
        "
        >
            {/* h-52
            bg-slate-900
            w-full
            mx-auto
            pt-8
            pb-4
            px-4 */}
            
            <div>
                {
                    (props.isContest === true) ?
                    <WrapIcon>
                        <div className="rounded-full bg-slate-700 p-3">
                            { symbol }                            
                        </div>
                    </WrapIcon> :
                    <div className="rounded-full bg-slate-700 p-3">
                        { symbol }
                    </div>
                }
            </div>
            
            {/* <div className="text-xl">
                { props.symbol }
            </div>

            <div className="h-6">
                <div className="hidden group-hover:flex text-sm">
                    { props.totalAssetOrSupply }
                </div>
            </div> */}

        </div>
    );
}