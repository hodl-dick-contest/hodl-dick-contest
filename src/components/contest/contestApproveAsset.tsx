import { useState } from "react";
import { useContractReadAllowance, useContractReadAsset } from "../../hooks/useContractReadContest";
import { useAccount } from "wagmi";
import { useContractWriteApprove } from "../../hooks/useContractWriteContest";
import { BigNumber } from "ethers";
import { ContestCurrentValueview } from "./contestCurrentValueView";
import { ContestContractWriteView } from "./contestContractWriteView";
import { EthAddress } from "../wallet/ethAddress";
import { ethers } from "ethers";


export const ContestApproveAsset = (props: { contractAddress: string }) => {

    const [userAllowance, setUserAllowance] = useState<string>("");

    const { address } = useAccount();
    const asset = useContractReadAsset(props.contractAddress);

    const allowance = useContractReadAllowance(asset.value!, address!, props.contractAddress!)    

    const userAllowanceInWei = (userAllowance) ? BigNumber.from(ethers.utils.parseUnits(userAllowance, "ether").toString()) : BigNumber.from("0");
    const { writeContract, transaction } = useContractWriteApprove(asset.value!, props.contractAddress, userAllowanceInWei!)

    return (
        <div className="w-full flex flex-col justify-start items-start gap-2">

            {/* <div className="text-slate-100 text-left">
                Check that you allowed the asset to be controled by the contest contract.
            </div> */}

            <div className="py-4 w-full flex flex-col justify-start items-start gap-4 text-slate-100">

                <ContestContractWriteView 
                    label="Approve amount"
                    name="Click here to approve"
                    value={ userAllowance }
                    setValue={ (event) => setUserAllowance(event.target.value) }
                    onClick={ (transaction.isSuccess) ? writeContract.reset : () => { writeContract.write?.() } }
                    disabled={ !writeContract.write }
                    isError={ writeContract.isError || transaction.isError }
                    isWaiting={ ( writeContract.isLoading || writeContract.isSuccess ) && transaction.isLoading }
                    isSucces={ transaction.isSuccess }
                />

                <div className="w-full flex flew-row justify-start items-start gap-4">
                    <EthAddress address={ asset.value! } label="Asset" />
                    <ContestCurrentValueview 
                        label="Allowance"
                        value={ allowance.value }
                        isRefetching={ allowance.isRefetching }
                        refetch={ allowance.refetch }
                    />
                </div>

            </div>

        </div>        
    )
}
