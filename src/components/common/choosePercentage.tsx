import { Dispatch } from "react";


export const ChooseRate = (props: { setRate: Dispatch<number>, values?: Array<number> }) => {

    let values: Array<number>;
    
    if (!props.values) {
        values = [ 1, 5, 10, 20, 50, 90 ];
    } else {
        values = props.values;
    }

    return (
        <div className="
            w-full 
            flex flex-row justify-between items-center gap-4
            "
        >
            {
                values.map((item, index) => (
                    <button 
                        key={ index }
                        className="w-24 px-4 py-2 text-sm font-light rounded-lg bg-slate-900 hover:bg-purple-400/60 hover:text-white"
                        onClick={ () => props.setRate(item) }
                    >
                        { `${ item } %` }
                    </button>
                ))
            }
        </div>
    );
}
