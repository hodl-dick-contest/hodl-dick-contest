import { PublicIconForGithub } from "../../icons/publicIcon";


export const Footer = () =>  {
    return (

            <div className="flex flex-row items-center justify-between">
                
                <div className="text-sm text-slate-200 font-light">
                    Copyright © 2022 Holder 🍆 Contest
                </div>

                <div className="flex flex-row items-center justify-between gap-8">                    
                    <PublicIconForGithub />
                </div>

            </div>
    );
}
