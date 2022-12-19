import truncateEthAddres from "truncate-eth-address";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { PolygonIcon } from "../../icons/blockchainIcon";
import { ToolTip } from "../common/tooltip";


export interface PropsEthAddress {
    label: string;
    address: string;
}

export const EthAddress = (props: PropsEthAddress) => {
    return (
        <div className="
            px-4 py-1
            flex flex-row items-center justify-start gap-2
            rounded-lg
            bg-slate-900 border border-slate-700
            "
        >
            <div className="text-xs mono font-light">
                { props.label }
            </div>

            <div className="text-xs mono font-light truncate">
                { (props.address) ? truncateEthAddres(props.address) : null }
            </div>

            <div className="bg-slate-600 rounded-full p-1 transition ease-in-out duration-150 hover:scale-110">
                <ToolTip tooltip="Copy address">
                    <DocumentDuplicateIcon className="w-3 h-3" onClick={() => { navigator.clipboard.writeText(props.address) }} />
                </ToolTip>
            </div>

            <div>
                <ToolTip tooltip="View on polygonscan">
                    <a 
                        className="flex justify-center items-center transition ease-in-out duration-150 hover:scale-110"
                        href={ `https://polygonscan.com/address/${ props.address }` }
                        rel="noopener noreferrer"
                        target="_blanck"
                    >
                        <PolygonIcon className="w-5 h-5"/>
                    </a>
                </ToolTip>
            </div>
        </div>
    );
}
