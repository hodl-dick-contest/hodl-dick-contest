import { ReactNode } from "react";


export const TransactionPanel = (props: {children: ReactNode}) => {
    return (
        <div className="pt-6 pb-2 px-8 w-full flex flex-col justify-start items-start gap-4">
            { props.children }
        </div>
    );
}