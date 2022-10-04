import { WalletButton } from "../wallet/walletButton";
// import { PuzzlePieceIcon } from "@heroicons/react/24/outline";


export const Header = () =>  {    
    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row justify-start items-center gap-4">
                <div className="text-4xl hover:animate-bounce">
                    🍆
                </div>
                <div className="text-left text-2xl font-bold text-slate-200 w-full">
                    Hodl Dick Contest
                </div>
            </div>
            <div className="flex justify-end">
                <WalletButton/>
            </div>            
        </div> 
    );
}
