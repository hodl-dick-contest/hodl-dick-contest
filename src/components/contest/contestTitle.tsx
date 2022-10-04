import { useContractReadName, useContractReadSymbol } from "../../hooks/useContractReadContest";


export const ContestTitle = (props: { contractAddress: string }) => {
    const name = useContractReadName(props.contractAddress);
    const symbol = useContractReadSymbol(props.contractAddress);

    return (
        <div className="flex flex-row justify-stat items-center gap-2">
            <div className="bg-slate-600 px-2 py-1 text-xl rounded-lg text-slate-100">
                { (!symbol.isLoading && !symbol.isError && symbol.value) ? symbol.value : null }
            </div>
            <div className="text-2xl text-slate-100">
                { (!name.isLoading && !name.isError && name.value) ? name.value : null }
            </div>
        </div>
    );
}

export const ContestSubTitle = (props: { subtitle: string}) => {
    return (
        <div className="w-full text-2xl text-slate-100">
            { props.subtitle }
        </div>
    );
}