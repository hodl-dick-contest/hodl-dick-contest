import { TransactionResponse } from "@ethersproject/abstract-provider";
import truncateEthAddress from 'truncate-eth-address';


export const TransactionAddress = (props: {address?: string}) => {
    const address = ( props.address ) ? truncateEthAddress(props.address) : null;
    return (
        <div className="bg-slate-700 px-2 py-1 rounded-lg">
            { address }
        </div>
    );
}

export const TransactionView = (props: {transaction: TransactionResponse}) => {

    return (
        <div className="
            px-3 py-3
            flex flex-row items-start justify-start gap-8
            bg-slate-800
            rounded-lg
            transition easy-in-out duration-100 hover:scale-105
            "
        >
            
            <div className="w-1/5 flex justify-center items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-700">
                    {/* <img alt="avatar" className="rounded-full overlfow-hidden "/> */}
                </div>
            </div>

            <div className="w-full flex flex-col items-start justify-start text-slate-100">
                <div className="flex flex-row items-center ">
                    <TransactionAddress address={ props.transaction.from }/>
                    <div className="text-slate-100 px-2">
                        to
                    </div>                    
                    <TransactionAddress address={ props.transaction.to }/>                                        
                </div>
                <div>
                    { null }
                </div>
            </div>

            <div className="flex flex-col items-center justify-between text-slate-100">
                {/* <div>
                    { props.transaction.timestamp }
                </div>
                <div>
                    { props.transaction.value.toString() }
                </div>
                <div>
                    { props.transaction.value.toString() }
                </div> */}
            </div>

        </div>
    );
}