import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { BigNumber } from "ethers";

import { useContractReadAsset, useContractReadBalanceOf, useContractReadPreviewDeposit, useContratReadConvertToShares } from "../../hooks/useContractReadContest";
import { useContractWriteDeposit } from "../../hooks/useContractWriteContest";

import { ChooseUnit } from "../common/chooseUnit";
import { TransactionButton } from "../common/transactionButton";
import { TransactionInfo } from "../common/transactionInfo";
import { TransactionInput } from "../common/transactionInput";
import { TransactionPanel } from "../common/transactionPanel";
import { ChooseRate } from "../common/choosePercentage";
import { EthAddress } from "../wallet/ethAddress";
import { helperFormatUnit, helperParseUnit } from "../../utils/convertValueBasedOnUnit";


export const ContestDepositAsset = (props: { contractAddress: string }) => {

    const { address } = useAccount();

    const [ unit, setUnit ] = useState<string>("ether");
    const [ userAssets, setUserAssets] = useState<string>("");
    const [ userAssetsInWei, setUserAssetsInWei] = useState<BigNumber>(BigNumber.from("0"));

    const asset = useContractReadAsset(props.contractAddress);
    const currentShareBalance = useContractReadBalanceOf(props.contractAddress, address!);
    const currentAssetBalance = useContractReadBalanceOf(asset.value!, address!);
    const depositConvertToShare = useContratReadConvertToShares(props.contractAddress, userAssetsInWei.toString());
    const previewDeposit = useContractReadPreviewDeposit(props.contractAddress, userAssetsInWei);
    const { writeContract, transaction } = useContractWriteDeposit(props.contractAddress, userAssetsInWei, address!);

    const displayCurrentAssetBalance = helperFormatUnit(currentAssetBalance.value, unit);
    const displayReceivedShares = helperFormatUnit(depositConvertToShare.value, unit);
    const displayFutureShareBalance = (currentShareBalance.value && previewDeposit.value ) ?
        helperFormatUnit( (BigNumber.from(currentShareBalance.value).add(BigNumber.from(previewDeposit.value!))).toString(), unit) : "";

    const changeRate = (item: number): string => {
        if (!currentAssetBalance.value) return "";
        const multiplier = BigNumber.from(item);
        const divider = BigNumber.from(100);
        const newUserAssetsInWei = BigNumber.from(currentAssetBalance.value!).mul(multiplier).div(divider);
        return helperFormatUnit(newUserAssetsInWei.toString(), unit);
    }

    useEffect(() => {
        setUserAssets(helperFormatUnit(userAssetsInWei.toString(), unit));
    }, [ unit ])  // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (userAssets) {
            setUserAssetsInWei(helperParseUnit(userAssets, unit));
        } else {
            setUserAssetsInWei(BigNumber.from("0"));
        }
    }, [ userAssets ])  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <TransactionPanel>

            <div className="text-slate-100 text-left text-xl">
                Deposit funds and show the you're an OG 🍆
            </div>

            <TransactionInfo label="Current Asset balance" value={ displayCurrentAssetBalance } />

            <div className="w-full rounded-lg bg-slate-900 relative">
                <div className="w-full flex justify-center items-center">
                    <TransactionInput
                        value={ userAssets }
                        setValue={ (event) => setUserAssets( event.target.value ) }
                    />
                </div>
                <button 
                    className="absolute w-20 text-center border rounded-lg border-slate-100 right-5 top-1/4"
                    onClick={ () => setUserAssets((Number(displayCurrentAssetBalance)).toString()) }
                >
                    Max
                </button>
            </div>

            <ChooseRate setRate={(item) => setUserAssets(changeRate(item)) }/>
            <TransactionInfo label="Shares you get" value={ displayReceivedShares } />            
            <TransactionInfo label="Expected share balance" value={ displayFutureShareBalance } />
            
            <div className="w-full flex flex-row justify-between items-center text-normal text-left font-semibold gap-2">
                <ChooseUnit setUnit={ setUnit } currentUnit= { unit }/>
                <EthAddress address={ props.contractAddress } label="Contest" />
            </div>

            <TransactionButton
                onClick={ (transaction.isSuccess) ? () => { writeContract.reset(); setUserAssets(""); currentShareBalance.refetch() } : () => { writeContract.write?.() } }
                disabled={ !writeContract.write }
                isError={ writeContract.isError || transaction.isError }
                isWaiting={ ( writeContract.isLoading || writeContract.isSuccess ) && transaction.isLoading }
                isSuccess={ transaction.isSuccess }
            >
                Deposit
            </TransactionButton>
        
        </TransactionPanel>        
    );
}
