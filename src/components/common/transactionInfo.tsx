interface PropsInfoDiv {
    label: string;
    value: string;
};

export const TransactionInfo = (props: PropsInfoDiv) => {
    return (    
        <div className="px-4 w-full flex flex-row justify-between items-center text-slate-100 gap-4 font-medium py-2 rounded-lg text-normal border border-slate-600">
            <div>
                { props.label }
            </div>
            <div>
                { props.value } 
            </div>
        </div>
    );
}
