import { ReactNode } from "react";


export const StepperPannel = (props: { children: ReactNode }) => {
    return (
        <div className="w-full flex flex-col justify-start items-start gap-4">
            { props.children }
        </div>
    );
}
