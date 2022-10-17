import { Fragment, ReactNode } from "react";
import { Tab } from "@headlessui/react";


export const TabTitle = (props: { children: ReactNode }) => {
    return (
        <Tab as={ Fragment }>
            {
                ({ selected }) => (
                    <button className={`
                        w-full
                        px-4
                        py-4
                        rounded-lg
                        font-semibold
                        text-center                        
                        text-base
                        ${selected ? "text-white": "text-slate-200"}
                        ${selected ? "bg-purple-400/60": "bg-slate-800"}
                        `}
                    >
                        { props.children }
                    </button> 
                )
            }
        </Tab>
    );
}
