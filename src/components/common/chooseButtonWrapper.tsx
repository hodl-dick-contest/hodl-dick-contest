import { ReactNode } from "react";


export const ChooseButtonWrapper = (props: { children: ReactNode }) => {
    return (
        <div className="w-full flex flex-row justify-between items-center gap-2">
            { props.children }
        </div>
    );
}
