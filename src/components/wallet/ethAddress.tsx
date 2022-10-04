import truncateEthAddres from "truncate-eth-address";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";


export interface PropsEthAddress {
    label: string;
    address: string;
}

export const EthAddress = (props: PropsEthAddress) => {
    return (
        <div className="px-4 py-2 h-11 flex flex-row items-center justify-start gap-2 rounded-lg bg-slate-800">
            <div className="text-sm font-mono">
                { props.label }
            </div>
            <div className="text-sm font-mono truncate">
                { (props.address) ? truncateEthAddres(props.address) : null }
            </div>
            <div className="bg-slate-600 rounded-full p-1 transition ease-in-out duration-150 hover:scale-110">
                <DocumentDuplicateIcon className="w-4 h-4" onClick={() => { navigator.clipboard.writeText(props.address) }} />
            </div>
        </div>
    );
}
