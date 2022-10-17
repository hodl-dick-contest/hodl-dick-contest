import { Dispatch } from "react";


export const ChooseUnit = (props: { setUnit: Dispatch<string>, units?: Array<string>, currentUnit?: string}) => {
    let units: Array<string>;
    
    if (!props.units) {
        units = ["ether", "gwei", "wei"];
    } else {
        units = props.units;
    }

    return (
        <div className="flex flex-row justify-start items-center border rounded-lg border-slate-600 divide-x divide-slate-600 overflow-hidden">
            {
                units.map((item, index) => (
                    <div 
                        className={`
                            px-4 py-1.5 mx-auto text-xs font-mono hover:text-white
                            ${ (units[index] === props.currentUnit) ? "bg-purple-400/60" : "bg-slate-900" }
                        `}
                        key={ index }
                        onClick={ () => props.setUnit(units[index]) } 
                    >
                        { item }
                    </div>
                ))
            }
        </div>  
    );
}
