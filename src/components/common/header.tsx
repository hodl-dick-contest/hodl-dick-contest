import { EgplantIconBig } from "../../icons/egplant";
import { WalletButton } from "../wallet/walletButton";


export const Header = () =>  {    
    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row justify-start items-center gap-4">
                <div className="text-4xl hover:animate-spin">
                    <EgplantIconBig />
                </div>
                <div className="text-left text-2xl font-normal text-slate-200 w-full">
                    The Holder Dick Contest
                </div>
            </div>
            <div className="flex justify-end">
                <WalletButton/>
            </div>            
        </div> 
    );
}
