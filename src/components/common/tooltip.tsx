interface PropsToolTip {
    tooltip: string;
    children: React.ReactNode
}

export const ToolTip = (props: PropsToolTip) => {
    return (
        <div className="group relative">
            { props.children }
            {
                (!props.tooltip) ? null :
                <span
                    className="
                        w-32 px-3 py-3
                        bg-slate-800
                        absolute
                        top-12 -translate-x-1/2 left-1/2
                        rounded-lg
                        text-xs
                        text-center
                        text-white
                        hidden group-hover:flex
                        rounded-lg
                        align-top
                        object-center
                    "
                    >
                        { props.tooltip } 
                </span>  
            }
        </div>
    );
}
