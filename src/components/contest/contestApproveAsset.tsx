import { useState, useEffect } from "react";
import { BigNumber } from "ethers";
import { useAccount } from "wagmi";

import { useContractWriteApprove } from "../../hooks/useContractWriteContest";
import { useContractReadAllowance, useContractReadAsset, useContractReadBalanceOf } from "../../hooks/useContractReadContest";

import { ChooseUnit } from "../common/chooseUnit";
import { TransactionButton } from "../common/transactionButton";
import { TransactionInfo } from "../common/transactionInfo";
import { TransactionInput } from "../common/transactionInput";
import { TransactionPanel } from "../common/transactionPanel";
import { ChooseRate } from "../common/choosePercentage";
import { EthAddress } from "../wallet/ethAddress";
import { helperFormatUnit, helperParseUnit } from "../../utils/convertValueBasedOnUnit";


export const ContestApproveAsset = (props: { contractAddress: string }) => {

    const [unit, setUnit] = useState<string>("ether");
    const [userAllowance, setUserAllowance] = useState<string>("");
    const [userAllowanceInWei, setUserAllowanceInWei] = useState<BigNumber>(BigNumber.from("0"));

    const { address } = useAccount();

    const currentAsset = useContractReadAsset(props.contractAddress);
    const currentBalance = useContractReadBalanceOf(currentAsset.value!, address!);
    const currentAllowance = useContractReadAllowance(currentAsset.value!, address!, props.contractAddress!);
    
    const displayCurrentBalance = helperFormatUnit(currentBalance.value!, unit);
    const displayCurrentAllowance = helperFormatUnit(currentAllowance.value!, unit);

    const { writeContract, transaction } = useContractWriteApprove(currentAsset.value!, props.contractAddress, userAllowanceInWei)

    const changeRate = (item: number): string => {
        if (!currentBalance.value) return "";
        const multiplier = BigNumber.from(item);
        const divider = BigNumber.from(100);
        const newUserAssetsInWei = BigNumber.from(currentBalance.value!).mul(multiplier).div(divider);
        return helperFormatUnit(newUserAssetsInWei.toString(), unit);
    }

    useEffect(() => {
        setUserAllowance(helperFormatUnit(userAllowanceInWei.toString(), unit));
    }, [ unit ])  // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (userAllowance) {
            setUserAllowanceInWei(helperParseUnit(userAllowance, unit));
        } else {
            setUserAllowanceInWei(BigNumber.from("0"));
        }
    }, [userAllowance])  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <TransactionPanel>

            <div className="text-slate-100 text-left text-xl">
                Make sure to allow enough funds to be managed by the asset.
            </div>

            <TransactionInfo label="Current allowance" value={ displayCurrentAllowance } />

            <div className="w-full rounded-lg bg-slate-900 relative">
                <div className="w-full flex justify-center items-center">
                    <TransactionInput
                        value={ userAllowance }
                        setValue={ (event) => setUserAllowance( event.target.value ) }
                    />
                </div>
                <button 
                    className="absolute w-20 text-center border rounded-lg border-slate-100 right-5 top-1/4"
                    onClick={ () => setUserAllowance((Number(displayCurrentBalance)).toString()) }
                >
                    Max
                </button>
            </div>

            <ChooseRate setRate={(item) => setUserAllowance(changeRate(item))}/>
            
            <TransactionInfo label="Current Asset balance" value={ displayCurrentBalance } />

            <div className="w-full flex flex-row justify-between items-center text-normal text-left font-semibold gap-2">
                <ChooseUnit setUnit={ setUnit } currentUnit= { unit }/>
                <EthAddress address={ currentAsset.value! } label="Asset" />
            </div>

            <TransactionButton
                onClick={ (transaction.isSuccess) ? () => { writeContract.reset(); setUserAllowance(""); currentAllowance.refetch() } : () => { writeContract.write?.() } }
                disabled={ !writeContract.write }
                isError={ writeContract.isError || transaction.isError }
                isWaiting={ ( writeContract.isLoading || writeContract.isSuccess ) && transaction.isLoading }
                isSuccess={ transaction.isSuccess }
            >
                Approve
            </TransactionButton>
        
        </TransactionPanel>   
    )
}
