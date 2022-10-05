import { ReactComponent as EthereumSvgLogo } from "./svg/ethereum.svg";
import { ReactComponent as PolygonSvgLogo } from "./svg/polygon.svg";


export const EthereumIcon = (props: {isBig: boolean}) => {
    if (props.isBig) {
        return <EthereumSvgLogo className="h-16 w-16" />;
    } else {
        return <EthereumSvgLogo className="h-9 w-9" />;
    }
}

export const PolygonIcon = () => {
    return <PolygonSvgLogo className="h-9 w-9 text-purple-500"/>;
}
