import { Page } from "../components/common/page";


export const PageNotConntected = () => {
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
