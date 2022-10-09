import FactoryJsonAbi from "../abi/HDCFactory.json";


export interface PropsUserFactoryParms {
    factoryAddress: string;
    factoryAbi: string;
}

export const useFactoryParams = (): PropsUserFactoryParms => {
    const factoryAddress = process.env.REACT_APP_FACTORY_ADDRESS!;
    const factoryAbi = JSON.stringify(FactoryJsonAbi);
    return { factoryAddress, factoryAbi };
}
