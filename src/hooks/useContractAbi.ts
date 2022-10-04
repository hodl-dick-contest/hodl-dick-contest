import ContractJsonAbi from "../abi/HDCContest.json";


export interface PropsUserContractAbi {
    contractAbi: string;
}

export const useContractAbi = (): PropsUserContractAbi => {
    const contractAbi = JSON.stringify(ContractJsonAbi);
    return { contractAbi };
}
