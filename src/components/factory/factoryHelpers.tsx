import { ReactNode, Dispatch } from "react";


export const FactoryAction = (props: { children: ReactNode }) => {
    return (
        <div className="py-3 text-xl text-semibold">
            { props.children }
        </div>
    );
}


export const FactoryTip = (props: { children: ReactNode }) => {
    return (
        <div className="w-full flex flex-col justify-start items-start gap-2 text-lg text-slate-200 italic">                        
            { props.children }
        </div>
    )
}


export const FactoryButton = (props: { children: ReactNode, onClick: () => void, disabled?: boolean }) => {
    return (
        <button 
            onClick={ props.onClick } 
            className={`
                w-full 
                py-2 px-10
                flex flew-row justify-center items-center
                rounded-lg
                text-lg
                font-semibold
                ${ (props.disabled) ? "bg-slate-900" : "bg-purple-400/60" }
            `}
            disabled={ props.disabled }
        >
            { props.children }
        </button>
    );
}


export const FactoryButtonWrapper = (props: { children: ReactNode }) => {
    return (
        <div className="w-full flex flex-row gap-4">
            { props.children }
        </div>
    );
}


interface PropsContestFactoryInput {
    title?: string;
    placeholder?: string;
    value: string;
    setValue?: Dispatch<string>;
    unit: string;
    type?: string;
    min?: string;
    step?: string; 
}


export const FactoryInput = (props: PropsContestFactoryInput) => {
    return (
        <div className="w-full text-slate-100 text-xl flex flex-col justify-start items-start">
            <div className="w-full relative bg-slate-900 rounded-lg text-slate-100 pl-6 pr-4 py-3 text-xl flex flex-row justify-start items-center">
                <input 
                    className="w-full flex justify-center outline-none bg-transparent text-center"
                    placeholder={ props.placeholder }
                    min={ props.min }
                    step={ props.step }
                    type={ props.type }
                    value={ props.value }
                    onChange={ props.setValue ? (event) => props.setValue!(event.target.value) : undefined }
                />
                <div className="absolute min-w-fit px-4 top-1/4 right-5 italic">
                    { props.unit }
                </div>
            </div>
        </div>
    );
}