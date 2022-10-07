import { ReactNode } from "react";
import { ShowIcon } from "./transactionIcon";


interface PropsTransactionButton {
    isError: boolean;
    isWaiting: boolean;
    isSuccess: boolean;
    onClick: () => void;
    disabled: boolean;
    children: ReactNode;
}

export const TransactionButton = (props: PropsTransactionButton) => {
    return (
        <button 
            className="w-full py-4 relative text-normal text-left font-semibold rounded-lg bg-slate-900 py-[0.5] px-3 hover:bg-purple-400/60"
            onClick={ props.onClick }
            disabled={ props.disabled }
        >
            <div className="w-full flex justify-center items-center">
                { props.children }
            </div>
            <div className="absolute right-5 top-1/4">
                <ShowIcon
                    isError={ props.isError }
                    isWaiting={ props.isWaiting }
                    isSuccess={ props.isSuccess }
                />
            </div>
        </button>
    );
}