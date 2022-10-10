import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { BigNumber } from "ethers";
import { useDebounce } from 'use-debounce';

import { useContractReadAllowance, useContractReadAsset, useContractReadBalanceOf, useContractReadPreviewDeposit, useContractReadSymbol, useContratReadConvertToShares } from "../../hooks/useContractReadContest";
import { useContractWriteApprove, useContractWriteDeposit } from "../../hooks/useContractWriteContest";

import { ChooseUnit } from "../common/chooseUnit";
import { TransactionButton } from "../common/transactionButton";
import { TransactionInfo } from "../common/transactionInfo";
import { TransactionInput } from "../common/transactionInput";
import { TransactionPanel } from "../common/transactionPanel";
import { ChooseRate } from "../common/choosePercentage";
import { EthAddress } from "../wallet/ethAddress";
import { helperFormatUnit, helperParseUnit } from "../../utils/convertValueBasedOnUnit";

const ZeroBalanceButton = () => {
    return (
        <TransactionButton
            onClick={ () => console.log("enter amount") }
            disabled={ false }
        >
            Enter deposit amount
        </TransactionButton>
    );
}


const ApproveDepositButton = (props: { assetAddress: string, contractAddress: string, approveAmmount: BigNumber|undefined, onTransactionSucess: () => void }) => {
    
    const [ debouncedApproveAmmount ] = useDebounce(props.approveAmmount, 1000);
    const approve = useContractWriteApprove(props.assetAddress, props.contractAddress, debouncedApproveAmmount);

    console.log("ApproveDepositButton");

    useEffect(() => {
        if (approve.transaction.isSuccess) {
            props.onTransactionSucess();
        }
    }, [ approve.transaction.isSuccess ]);

    return (
        <TransactionButton
            onClick={ () => approve.writeContract.write?.() }
            disabled={ !approve.writeContract.write }
            isError={ approve.writeContract.isError || approve.transaction.isError }
            isWaiting={ ( approve.writeContract.isLoading || approve.writeContract.isSuccess ) && approve.transaction.isLoading }
            isSuccess={ approve.transaction.isSuccess }
        >
            { `Authorize deposit` }
        </TransactionButton>
    );
}

const DepositButton = (props: { contractAddress: string, depositAmount: BigNumber|undefined, receiverAddress: string, clearDepositAmount: () => void }) => {

    const [ debouncedDepositAmount ] = useDebounce(props.depositAmount, 1000);
    const deposit = useContractWriteDeposit(props.contractAddress, debouncedDepositAmount, props.receiverAddress);

    console.log("DepositButton");

    useEffect(() => {
        if (deposit.transaction.isSuccess) {
            props.clearDepositAmount();
        }
    }, [ deposit.transaction ]);

    return (
        <TransactionButton
            onClick={ () => deposit.writeContract.write?.()  }
            disabled={ false }
            isError={ deposit.writeContract.isError || deposit.transaction.isError }
            isWaiting={ ( deposit.writeContract.isLoading || deposit.writeContract.isSuccess ) && deposit.transaction.isLoading }
            isSuccess={ deposit.transaction.isSuccess }
        >
            Deposit
        </TransactionButton>
    );
}

const DepositLogic = (props: { contractAddress: string, depositAmount: BigNumber|undefined, clearDepositAmount: () => void }) => {

    const { address } = useAccount();
    const asset = useContractReadAsset(props.contractAddress);
    const currentAllowance = useContractReadAllowance(asset.value!, address!, props.contractAddress!);
    
    let shouldFirstApprove: boolean|undefined;
    
    console.log("DepositLogic");
    console.log(props.depositAmount);
    console.log("Current all", currentAllowance.value);

    if ( props.depositAmount === undefined || props.depositAmount.eq(BigNumber.from("0")) ) { 
        return <ZeroBalanceButton />;
    }

    if ( asset.value !== undefined && currentAllowance.value !== undefined ) {
        const allowanceInWei = BigNumber.from(currentAllowance.value);
        if ( props.depositAmount.gt(allowanceInWei) ) {
            shouldFirstApprove = true;
        } else {
            shouldFirstApprove = false;
        }
    }

    if ( shouldFirstApprove === true) {
        return (
            <ApproveDepositButton
                assetAddress={ asset.value! }
                contractAddress={ props.contractAddress }
                approveAmmount={ props.depositAmount.add(BigNumber.from("1")) }
                onTransactionSucess={ () => currentAllowance.refetch() }
            />
        );
    } else if (shouldFirstApprove === false ) { 
        return (
            <DepositButton
                contractAddress={ props.contractAddress }
                depositAmount={ props.depositAmount! }
                receiverAddress={ address! }
                clearDepositAmount={ props.clearDepositAmount }
            />
        );
    } else {
        return (
            <TransactionButton
                onClick={ () => console.log("waiting") }
                disabled={ false }
                isError={ false }
                isWaiting={ false }
                isSuccess={ false }
            >
                Waiting
            </TransactionButton>
        );
    }
}

export const ContestDepositAsset = (props: { contractAddress: string }) => {

    const { address } = useAccount();

    const [ unit, setUnit ] = useState<string>("ether");
    const [ userAssets, setUserAssets] = useState<string>("");
    const [ userAssetsInWei, setUserAssetsInWei] = useState<BigNumber>(BigNumber.from("0"));
    const [ debounceUserAssetsInWei ] = useDebounce(userAssetsInWei, 2000);

    const asset = useContractReadAsset(props.contractAddress);

    const currentShareBalance = useContractReadBalanceOf(props.contractAddress, address!);
    const currentAssetBalance = useContractReadBalanceOf(asset.value!, address!);
    
    const previewDeposit = useContractReadPreviewDeposit(props.contractAddress, (debounceUserAssetsInWei) ? debounceUserAssetsInWei : undefined);
    const depositConvertToShare = useContratReadConvertToShares(props.contractAddress, (debounceUserAssetsInWei) ? debounceUserAssetsInWei : undefined);
    
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
                Deposit funds and show you're an OG 🍆
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

            <DepositLogic 
                contractAddress={ props.contractAddress }
                depositAmount={ debounceUserAssetsInWei }
                clearDepositAmount={ () => setUserAssets("0") }
            />
        
        </TransactionPanel>        
    );
}
