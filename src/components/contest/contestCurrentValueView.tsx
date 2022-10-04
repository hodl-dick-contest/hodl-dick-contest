import { ArrowPathIcon } from "@heroicons/react/24/outline";


export interface PropsContestCurrentValueView {
    label: string;
    value: any;
    isRefetching: boolean;
    refetch: () => void;
}


export const ContestCurrentValueview = (props: PropsContestCurrentValueView) => {
    return(
        <div className="h-11
            w-full px-4 py-2 bg-slate-800 flex flex-row justify-between items-center gap-2 rounded-lg text-base
            "
        >
            
            <div className="flex text-normal text-left font-semibold">
                { props.label }
            </div>

            <div className="grow text-normal text-right rounded-lg px-2 py-1 mx-2 font-mono text-sm">
                { props.value }
            </div>

            <button onClick={ props.refetch } className="p-[0.5] rounded-full bg-slate-600">
                {
                    (props.isRefetching) ?
                    <ArrowPathIcon className="w-5 h-5 m-1 animate-spin"/> :
                    <ArrowPathIcon className="w-5 h-5 m-1 "/>
                }
            </button>

        </div>
    );
}
