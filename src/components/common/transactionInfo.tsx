interface PropsInfoDiv {
    label: string;
    value: string;
};

export const TransactionInfo = (props: PropsInfoDiv) => {
    return (    
        <div className="
            w-full 
            px-4 
            py-2 
            flex flex-row justify-between items-center gap-4
            text-slate-100
            text-sm
            font-light
            rounded-lg 
            border 
            border-slate-700
            "
        >
            <div className="text-inherit">
                { props.label }
            </div>
            <div className="text-inherit">
                { props.value } 
            </div>
        </div>
    );
}
