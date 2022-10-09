import { CheckIcon } from '@heroicons/react/24/solid'
import { ReactNode, useState } from 'react';

export interface IStep {
    id: string;
    name: string;
    status: string;
    href: string;
}

export const StepperName = (props: {step: IStep, status: string}) => {
    return (
        <span className={`
            ml-4 
            text-base 
            font-medium 
            ${ ( props.status === "current" ) ? "text-purple-400" : "text-slate-100" }
            ${ ( props.status === "current" ) ? "" : "group-hover:text-white" }        
            `}
        >
            { props.step.name }
        </span>
    );
}

export const StepperSymbol = (props: {step: IStep, status: string}) => {
    if ( props.status === "complete" ) {
        return (
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-400/60 group-hover:bg-purple-400/60">
                <CheckIcon className="h-4 w-4 text-white" aria-hidden="true" />
            </span>
        ); 
    } else if ( props.status === "current" ) {
        return (
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-purple-400">
                <span className="text-purple-400">
                    { props.step.id }
                </span>
            </span>
        );
    } else {
        return (
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-slate-100 group-hover:border-white">
                <span className="text-slate-100 group-hover:text-white">
                    { props.step.id }
                </span>
            </span>
        );
    }
}


export const StepperItem = (props: {step: IStep, status: string}) => {
    return (
        <a href={ props.step.href } className="group flex w-full items-center">
            <span className="flex items-center px-6 py-4 text-base font-medium">
                <StepperSymbol step={ props.step } status={ props.status } />
                <StepperName step={ props.step } status={ props.status } />
            </span>
        </a>
    );
}


export const StepperArrow = () => {
    return (
        <div className="absolute top-0 right-0 hidden h-full w-5 md:block" aria-hidden="true">
            <svg
                className="h-full w-full text-slate-100"
                viewBox="0 0 22 80"
                fill="none"
                preserveAspectRatio="none"
            >
                <path
                    d="M0 -2L20 40L0 82"
                    vectorEffect="non-scaling-stroke"
                    stroke="currentcolor"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    )
}

export const Stepper = (props: { steps: Array<IStep>, currentIndex: number }) => {

    const chooseStepIndex = (step: IStep, stepindex: number) => {
        if ( stepindex < props.currentIndex ) {
            return <StepperItem step={ step } status="complete" />
        } else if ( stepindex === props.currentIndex ) {
            return <StepperItem step={ step } status="current" />
        } else {
            return <StepperItem step={ step } status="next" />
        }
    }

    return (
        <nav aria-label="Progress" className="w-full">
            <ol
                className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
            >
                {
                    props.steps.map((step, stepIndex) => (
                        <li key={step.name} className="relative md:flex md:flex-1">
                            { 
                                chooseStepIndex(step, stepIndex)
                            }
                            { stepIndex !== props.steps.length - 1 ? <StepperArrow /> : null }
                        </li>
                    )
                )}
            </ol>
        </nav>
    );
}
