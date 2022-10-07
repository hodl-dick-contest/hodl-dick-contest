import { useState, useEffect } from "react";
import { BigNumber } from "ethers";
import { useAccount } from "wagmi";

import { useContractReadAsset, useContractReadBalanceOf, useContractReadPreviewRedeem } from "../../hooks/useContractReadContest";
import { useContractWriteRedeem } from "../../hooks/useContractWriteContest";

import { ChooseUnit } from "../common/chooseUnit";
import { TransactionButton } from "../common/transactionButton";
import { TransactionInfo } from "../common/transactionInfo";
import { TransactionInput } from "../common/transactionInput";
import { TransactionPanel } from "../common/transactionPanel";
import { ChooseRate } from "../common/choosePercentage";
import { EthAddress } from "../wallet/ethAddress";
import { helperFormatUnit, helperParseUnit } from "../../utils/convertValueBasedOnUnit";


export const ContestWithdrawAsset = (props: { contractAddress: string }) => {

    const { address } = useAccount();

    const [ unit, setUnit ] = useState<string>("ether");
    const [ userShares, setUserShares] = useState<string>("");
    const [ userSharesInWei, setUserSharesInWei] = useState<BigNumber>(BigNumber.from("0"));

    const asset = useContractReadAsset(props.contractAddress);
    const currentAssetBalance = useContractReadBalanceOf(asset.value!, address!);
    const currentShareBalance = useContractReadBalanceOf(props.contractAddress, address!);
    // const maxRedeem = useContractReadMaxRedeem(props.contractAddress, address!);
    const previewRedeem = useContractReadPreviewRedeem(props.contractAddress, userSharesInWei);
    const { writeContract, transaction } = useContractWriteRedeem(props.contractAddress, userSharesInWei, address!, address!);

    const displayCurrentShareBalance = helperFormatUnit(currentShareBalance.value, unit);
    const displayPreviewRedeem = helperFormatUnit(previewRedeem.value, unit);
    const displaySimulatedAssetBalance = (currentAssetBalance.value && previewRedeem.value ) ?
        helperFormatUnit( (BigNumber.from(currentAssetBalance.value).add(BigNumber.from(previewRedeem.value!))).toString(), unit) : "";
    
    const changeRate = (item: number): string => {
        if (!currentShareBalance.value) return "";
        const multiplier = BigNumber.from(item);
        const divider = BigNumber.from(100);
        const newUserAssetsInWei = BigNumber.from(currentShareBalance.value!).mul(multiplier).div(divider);
        return helperFormatUnit(newUserAssetsInWei.toString(), unit);
    }

    useEffect(() => {
        setUserShares(helperFormatUnit(userSharesInWei.toString(), unit));
    }, [ unit ])  // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (userShares) {
            setUserSharesInWei(helperParseUnit(userShares, unit));
        } else {
            setUserSharesInWei(BigNumber.from("0"));
        }
    }, [userShares])  // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <TransactionPanel>

            <div className="text-slate-100 text-left text-xl">
                How long will you last ?
            </div>

            <TransactionInfo label="Current share balance" value={ displayCurrentShareBalance } />

            <div className="w-full rounded-lg bg-slate-900 relative">
                <div className="w-full flex justify-center items-center">
                    <TransactionInput
                        value={ userShares }
                        setValue={ (event) => setUserShares( event.target.value ) }
                    />
                </div>
                <button
                    className="absolute w-20 text-center border rounded-lg border-slate-100 right-5 top-1/4"
                    onClick={ () => setUserShares((Number(displayCurrentShareBalance)).toString()) }
                >
                    Max
                </button>
            </div>

            <ChooseRate setRate={(item) => setUserShares(changeRate(item)) }/>        
            <TransactionInfo label="Assets you get" value={ displayPreviewRedeem } />
            <TransactionInfo label="Expected asset balance" value={ displaySimulatedAssetBalance } />

            <div className="w-full flex flex-row justify-between items-center text-normal text-left font-semibold gap-2">
                <ChooseUnit setUnit={ setUnit } currentUnit= { unit }/>
                <EthAddress address={ props.contractAddress } label="Contest" />
            </div>

            <TransactionButton
                onClick={ (transaction.isSuccess) ? () => { writeContract.reset(); setUserShares(""); currentShareBalance.refetch() } : () => { writeContract.write?.() } }
                disabled={ !writeContract.write }
                isError={ writeContract.isError || transaction.isError }
                isWaiting={ ( writeContract.isLoading || writeContract.isSuccess ) && transaction.isLoading }
                isSuccess={ transaction.isSuccess }
            >
                Redeem
            </TransactionButton>
        
        </TransactionPanel>        
    )
}
