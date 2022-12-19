import { EgplantIcon } from "../../icons/egplant";

interface PropsWrapIcon {
    children: React.ReactNode
}

export const WrapIcon = (props: PropsWrapIcon) => {
    return (
        <div className="group relative border border-slate-700 border-1 rounded-full">
            { props.children }
            <span
                className="                    
                    absolute
                    bottom-0 left-1/2
                    rounded-lg            
                    align-top
                    object-center
                "
                >
                    <EgplantIcon/>
            </span> 
        </div>
    );
}
