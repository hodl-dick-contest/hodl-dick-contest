import { Page } from "../components/common/page";
import { ContestView } from "../components/contest/contestView";
import { useFactoryListChildren } from "../hooks/useFactoryListChildren";


export const PageHome = () => {
    const { children } = useFactoryListChildren();
    return (
        <Page>
            <div className="w-full flex flex-col justify-start items-start gap-4">
                <div className="w-full flex flex-row justify-between items-center">
                    <div className="text-2xl text-slate-100">
                        Contests
                    </div>
                    {/* <button className="rounded-full px-2 py-1 text-slate-200 hover:text-white bg-slate-600 hover:bg-purple-400/60 transition ease-in-out duration-150 hover:scale-105">
                        Add contract
                    </button> */}
                </div>
                <div className="w-full flex flex-col justify-start items-start">
                    { 
                        (!children) ? null :
                        children.map((item, key) => <ContestView address={ item } key={ key }/>)
                    }
                </div>
            </div>            
        </Page>
    );
}
