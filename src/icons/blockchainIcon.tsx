import { ReactComponent as BitcoinSvgLogo } from "./svg/bitcoin.svg";
import { ReactComponent as EthereumSvgLogo } from "./svg/ethereum.svg";
import { ReactComponent as PolygonSvgLogo } from "./svg/polygon.svg";


interface PropsBlockchainIcon {
    isSmall?: boolean;
    isLarge?: boolean;
    className?: string;
}

export const BitcoinIcon = (props: PropsBlockchainIcon) => {
    if (props.isLarge) {
        return <BitcoinSvgLogo className="h-16 w-16" />;
    } else if ( props.isSmall ) {
        return <BitcoinSvgLogo className="h-5 w-5" />;
    } else {
        return <BitcoinSvgLogo className="h-9 w-9" />;
    }
}

export const EthereumIcon = (props: PropsBlockchainIcon) => {
    if (props.isLarge) {
        return <EthereumSvgLogo className="h-16 w-16" />;
    } else if ( props.isSmall ) {
        return <EthereumSvgLogo className="h-5 w-5" />;
    } else {
        return <EthereumSvgLogo className="h-9 w-9" />;
    }
}

export const PolygonIcon = (props: PropsBlockchainIcon) => {
    if (props.className) {
        return <PolygonSvgLogo className={ props.className } />;
    } else if (props.isLarge) {
        return <PolygonSvgLogo className="h-16 w-16" />;
    } else if ( props.isSmall ) {
        return <PolygonSvgLogo className="h-5 w-5" />;
    } else {
        return <PolygonSvgLogo className="h-9 w-9" />;
    }
}
