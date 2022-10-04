import { PublicIconForDiscord, PublicIconForGithub, PublicIconForTelegram, PublicIconForTwitter } from "../../icons/publicIcon";


export const Footer = () =>  {
    return (

            <div className="flex flex-row items-center justify-between">
                
                <div className="text-sm text-slate-200">
                    Copyright © 2022 Hodl Dick Contest
                </div>

                <div className="flex flex-row items-center justify-between gap-8">
                    <PublicIconForDiscord />
                    <PublicIconForGithub />
                    <PublicIconForTelegram />
                    <PublicIconForTwitter />
                </div>

            </div>     
    );
}
