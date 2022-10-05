import { Page } from "../components/common/page";
import { ContestView } from "../components/contest/contestView";
import { useFactoryListChildren } from "../hooks/useFactoryListChildren";
import { useAccount } from "wagmi";


export const PageHome = () => {
    const { children } = useFactoryListChildren();
    const { isConnected } = useAccount();
    if (isConnected) {
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
    } else {
        return (
            <Page>
                <div className="w-full mt-16 flex flex-col justify-start items-start gap-12">
                    
                    <div className="text-transparent text-7xl bg-clip-text bg-gradient-to-r from-purple-600 to-purple-300 font-mono">
                        Connect wallet
                    </div>

                    <div className="text-6xl text-slate-100 font-mono">
                        to access the
                    </div>

                    <div className="flex flex-row text-7xl text-slate-100 gap-6 font-mono">
                        Holder <div className="animate-bounce hover:animate-spin"> 🍆 </div> <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-300">Contest</div>
                    </div>

                </div>
            </Page>
        );
    }
}
