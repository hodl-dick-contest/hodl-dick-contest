import { ReactElement, ReactEventHandler } from "react";

interface IButton {
    text: string|ReactElement|null;
    icon?: ReactElement|null; 
    onClick?: ReactEventHandler;
    disabled?: boolean|undefined;
}

export const Button = (props: IButton) => {
    return (
        <button
            className="            
            w-full            
            py-2
            px-3
            flex flex-row items-center justify-center
            text-base
            text-slate-200 hover:text-white
            font-bold
            rounded-lg            
            bg-slate-800 hover:bg-purple-400/60
            transition ease-in-out hover:scale-105 hover
            group
            "
            onClick={ props.onClick }
            type={ "button" }
            disabled={ props.disabled }
        >
            {
                (!props.icon) ? null :
                <div className="group-hover:text-white">
                    { props.icon }
                </div>
            }
            {
                ( !props.disabled ) ?
                <div className="group-hover:text-white"> 
                    { props.text } 
                </div> 
                :
                <div className="text-stone-500 group-hover:text-white"> 
                    { props.text } 
                </div>
            }
        </button>
    );
}
