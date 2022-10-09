import { ReactNode } from "react";


export const ChooseButton = (props: { children: ReactNode, onClick: () => void}, index: number) => {
    return (
        <button 
            key={ index }
            className="w-28 flex justify-center py-4 font-semibold rounded-lg bg-slate-900 hover:bg-purple-400/60 hover:text-white"
            onClick={ props.onClick }
        >
            { props.children }
        </button>
    );
}
