import React from "react";

interface PropsContestItemsWarpper {
    children: React.ReactNode; 
}

export const ContestItemsWarpper: React.FC<PropsContestItemsWarpper>  = ({ children }) =>  {    
    return (
        <div className="w-full flex flex-col justify-between rounded-lg overflow-hidden border border-slate-600 divide-y divide-slate-600">
            { children }
        </div>
    );
}
