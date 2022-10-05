import { useState } from "react";
import { BigNumber } from "ethers";
import { useAccount } from "wagmi";

import { useContractReadMaxWithdraw } from "../../hooks/useContractReadContest";
import { useContractWriteWithdraw } from "../../hooks/useContractWriteContest";

import { ContestCurrentValueview } from "./contestCurrentValueView";
import { ContestContractWriteView } from "./contestContractWriteView";
import { EthAddress } from "../wallet/ethAddress";
import { ethers } from "ethers";


export const ContestWithdrawAsset = (props: { contractAddress: string }) => {

    const { address } = useAccount();

    const [userShares, setUserShares] = useState<string>("");

    const userSharesInWei = (userShares) ? BigNumber.from(ethers.utils.parseUnits(userShares, "ether").toString()) : BigNumber.from("0");
    const maxWithdraw = useContractReadMaxWithdraw(props.contractAddress, address!)    
    const { writeContract, transaction } = useContractWriteWithdraw(props.contractAddress, userSharesInWei, address!, address!);

    return (
        <div className="w-full flex flex-col justify-start items-start gap-2">

            <div className="py-4 w-full flex flex-col justify-start items-start gap-4 text-slate-100">
                
                <ContestContractWriteView 
                    label="Withraw amount"
                    name="Click here to withdraw"
                    value={ (userShares !== undefined) ? userShares.toString() : "" }
                    setValue={ (event) => setUserShares(event.target.value) }
                    onClick={ (transaction.isSuccess) ? writeContract.reset : () => { writeContract.write?.() } }
                    disabled={ !writeContract.write }
                    isError={ writeContract.isError || transaction.isError }
                    isWaiting={ ( writeContract.isLoading || writeContract.isSuccess ) && transaction.isLoading }
                    isSucces={ transaction.isSuccess }
                />

                <div className="w-full flex flew-row justify-start items-start gap-4">
                    <EthAddress address={ props.contractAddress! } label="Asset" />
                    <ContestCurrentValueview 
                        label="Max Withdraw"
                        value={ maxWithdraw.value }
                        isRefetching={ maxWithdraw.isRefetching }
                        refetch={ maxWithdraw.refetch }
                    />
                </div>            
            </div>
        </div>        
    )
}
