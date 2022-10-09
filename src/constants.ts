import factoryAddressJsonAbi from "./abi/HDCFactory.json";
import { Asset } from "./interfaces/asset";

export const factoryAddress: string = process.env.REACT_ENV_FACTORY_ADDRESS!;
export const factoryAbi: Object = factoryAddressJsonAbi!;


export const supportedAssets: Array<Asset> = [
    {
        name: "WBTC",
        address: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
    },
    {
        name: "WETH",
        address: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    }
]
