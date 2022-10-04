import { useNavigate } from "react-router-dom";
import { useFactoryChild } from "../../hooks/useFactoryChild";
import truncateEthAddress from "truncate-eth-address";

export const ContestItem = (props: { name?: string }) => {
    return (
        ( props.name === undefined ) ?
        null :
        <div className="
            px-3 py-1 
            text-sm
            rounded-lg 
            bg-slate-600 
            text-slate-200 hover:text-white
            "
        >
            { props.name }
        </div>
    )
}

export const ContestView = (props: { address: string }) => {
    const result = useFactoryChild(props.address);
    console.log("result");
    console.log(result);

    const naviguate = useNavigate();

    return (
        <div className="
            w-full
            px-3 my-3 py-3
            flex flex-col justify-between items-start
            bg-slate-800 hover:bg-purple-400/60
            rounded-lg
            transition easy-in-out duration-150 hover:scale-[1.02]
            "
            onClick={ () => naviguate("/contest/" + props.address )}
        >
            <div className="w-full flex flex-row justify-between items-start gap-2 py-2">
                <div className="flex flex-col justify-start items-start gap-2">
                    <ContestItem name={ result.symbol } />
                    <ContestItem name={ result.name } />
                </div>
                <div className="flex flex-row">
                    <ContestItem name={ (!result.vestingPeriod) ? '' : result.vestingPeriod!.toString() } />
                </div>
            </div>

            <div className="w-full flex flex-row justify-between items-center gap-2 py-2">
                <div className="flex flex-row justify-start items-center gap-2">
                    <ContestItem name={ `Supply: ${result.totalSupply!}` }/>
                    <ContestItem name={ `Assets: ${result.totalAssets!}` }/>
                    <ContestItem name={ `Withdraw fees: ${result.withdrawFee!}` }/>
                </div>
                <div className="flex flex-row justify-end gap-2">
                    <ContestItem name={ truncateEthAddress(props.address) } />
                    <ContestItem name={ "ERC4276" } />
                </div>
            </div>

        </div>
    )
}
