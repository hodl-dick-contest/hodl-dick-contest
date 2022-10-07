import { Fragment, ReactNode } from "react";
import { Tab } from "@headlessui/react";


export const TabPanel = (props: { children: ReactNode }) => {
    return (
        <Tab.Panel as={ Fragment }>
            <div className="min-h-full px-4 py-4 w-full bg-slate-800 rounded-lg text-slate-100 mx-auto">
                { props.children }
            </div>
        </Tab.Panel>
    )
}
