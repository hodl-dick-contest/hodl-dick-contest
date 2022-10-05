export interface PropsContestParameter {
    label: string;
    value?: string|number;
    isLoading?: boolean;
    isError?: boolean;
}

export const ContestParameter = (props: PropsContestParameter) => {
    let displayValue;
    if (props.value) {
        displayValue = props.value;
    } else if (props.isError) {
        displayValue = "Error fetching";
    } else if (props.isLoading) {
        displayValue = "Loading";
    } else {
        console.log("Should not happen");
        displayValue = null;
    }

    return (
        <div className="py-4 px-8 flex flex-row justify-between gap-4">

            <div className="text-left text-slate-100 font-mono font-light">
                { props.label }
            </div>

            <div className="text-right text-slate-100 font-mono font-light truncate">
                { displayValue }
            </div>
            
        </div>
    );
}
