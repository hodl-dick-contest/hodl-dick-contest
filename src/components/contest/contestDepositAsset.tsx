import { useState } from "react";
import { useAccount } from "wagmi";
import { BigNumber } from "ethers";

import { useContractReadBalanceOf } from "../../hooks/useContractReadContest";
import { useContractWriteDeposit } from "../../hooks/useContractWriteContest";

import { EthAddress } from "../wallet/ethAddress";

import { ContestCurrentValueview } from "./contestCurrentValueView";
import { ContestContractWriteView } from "./contestContractWriteView";


export const ContestDepositAsset = (props: { contractAddress: string }) => {

    const { address } = useAccount();

    const [assets, setAssets] = useState<BigNumber|undefined>(undefined);

    const balanceOf = useContractReadBalanceOf(props.contractAddress, address!)    
    const { writeContract, transaction } = useContractWriteDeposit(props.contractAddress, assets, address!);

    return (
        <div className="w-full flex flex-col justify-start items-start gap-2">

            {/* <div className="text-slate-100 text-left">                
            </div> */}

            <div className="py-4 w-full flex flex-col justify-start items-start gap-4 text-slate-100">
                
                <ContestContractWriteView 
                    label="Deposit amount [wei]"
                    name="Click here to deposit"
                    value={ (assets !== undefined) ? assets.toString() : "" }
                    setValue={ (event) => setAssets(BigNumber.from(event.target.value)) }
                    onClick={ (transaction.isSuccess) ? writeContract.reset : () => { writeContract.write?.() } }
                    disabled={ !writeContract.write }
                    isError={ writeContract.isError || transaction.isError }
                    isWaiting={ ( writeContract.isLoading || writeContract.isSuccess ) && transaction.isLoading }
                    isSucces={ transaction.isSuccess }
                />

                <div className="w-full flex flew-row justify-start items-start gap-4">
                    <EthAddress address={ props.contractAddress! } label="Asset" />
                    <ContestCurrentValueview 
                        label="Balance"
                        value={ balanceOf.value }
                        isRefetching={ balanceOf.isRefetching }
                        refetch={ balanceOf.refetch }
                    />
                </div>
            
            </div>

        </div>        
    )
}
