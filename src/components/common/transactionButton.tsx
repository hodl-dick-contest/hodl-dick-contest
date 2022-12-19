import { ReactNode } from "react";
import { ShowIcon } from "./transactionIcon";


interface PropsTransactionButton {
    isError?: boolean;
    isWaiting?: boolean;
    isSuccess?: boolean;
    onClick?: () => void;
    disabled: boolean;
    children: ReactNode;
    bgSecondary?: boolean;
}

export const TransactionButton = (props: PropsTransactionButton) => {
    return (
        <button 
            className={
                `
                w-full
                py-2
                relative
                flex
                justify-center
                text-normal
                text-left
                font-light
                rounded-lg
                px-3
                ${ (props.bgSecondary) ? "bg-purple-400/60" : "bg-slate-900" } hover:bg-purple-400/60
                transition ease-in-out duration-150 hover:scale-[1.02]
                `}
            onClick={ props.onClick }
            disabled={ props.disabled }
        >

            <div className="w-full flex justify-center items-center">
                { props.children }
            </div>

            {
                ( props.disabled ) ? null :
                <div className="absolute right-5 top-1/5">
                    <ShowIcon
                        isError={ props.isError }
                        isWaiting={ props.isWaiting }
                        isSuccess={ props.isSuccess }
                    />
                </div>
            }

        </button>
    );
}