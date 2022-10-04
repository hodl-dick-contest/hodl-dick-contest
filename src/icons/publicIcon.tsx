import { ReactElement } from "react";
import { FaDiscord, FaGithub, FaTelegram, FaTwitter } from "react-icons/fa";


interface PropsPublicIcon {
    name: string;
    href?: string;
    symbol?: ReactElement;
}


const PublicIcon = (props: PropsPublicIcon) => {
    return (
        <a href={ props.href } target="_blank" rel="noopener noreferrer">
            <div className="
                flex flex-row items-center justify-start gap-2
                text-slate-300 hover:text-slate-100
                transition ease-in-out duration-100 hover:scale-110
                "
            >
                <div className="text-xl">
                    { props.symbol }
                </div>
                <div className="text-md">
                    { props.name }
                </div>
            </div>
        </a>
    );
}

export const PublicIconForDiscord = () => {
    return (
        <PublicIcon
            name=""
            href=""
            symbol={ <FaDiscord className="h-5 w-5"/> }
        />
    );
}

export const PublicIconForGithub = () => {
    return (
        <PublicIcon
            name=""
            href="https://github.com/upfin"
            symbol={ <FaGithub className="h-5 w-5"/> }
        />
    );
}

export const PublicIconForTelegram = () => {
    return (
        <PublicIcon
            name=""
            href=""
            symbol={ <FaTelegram className="h-5 w-5"/> }
        />
    );
}

export const PublicIconForTwitter = () => {
    return (
        <PublicIcon
            name=""
            href=""
            symbol={ <FaTwitter className="h-5 w-5"/> }
        />
    );
}
