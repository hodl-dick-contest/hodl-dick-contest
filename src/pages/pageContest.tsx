import { useParams, useNavigate } from "react-router-dom";
import { Page } from "../components/common/page";
import { ContestApproveAsset } from "../components/contest/contestApproveAsset";
import { ContestDepositAsset } from "../components/contest/contestDepositAsset";
import { ContestItemsWarpper } from "../components/contest/contestItemsWrapper";
import { ContestParameters } from "../components/contest/contestParameters";
import { ContestSubTitle, ContestTitle } from "../components/contest/contestTitle";
import { ContestUserConvertToAssets, ContestUserConvertToShares } from "../components/contest/contestUserConverters";
import { ContestUserPreviewDeposit, ContestUserPreviewWithdraw } from "../components/contest/contestUserPreviews";
import { ContestWithdrawAsset } from "../components/contest/contestWithdrawAsset";
import { useAccount } from "wagmi";
import { useState } from "react";
import { Modal } from "../components/common/modal";


export const PageContest = () => {

    const [openParams, setOpenParams] = useState<boolean>(false);
    const { contractAddress } = useParams();
    const { isConnected } = useAccount();
    const navigate = useNavigate();

    if (!isConnected) {
        navigate("/");
    }

    return (
        <Page>
        
            <div className="w-full flex flex-col justify-start items-start gap-6">
                
                <div className="w-full flex flex-row justify-between items-center gap-4">
                    <div className="min-w-fit">
                        <ContestTitle contractAddress={ contractAddress! }/>
                    </div>

                    <div className="w-full flex flex-row justify-end items-center gap-4">
                        <button 
                            className="rounded-full px-4 py-1 text-slate-200 hover:text-white bg-slate-600 hover:bg-purple-400/60 transition ease-in-out duration-150 hover:scale-105 font-semibold"
                            onClick={ () => navigate("/")}
                        >
                            Back to contests
                        </button>
                        <button 
                            className="rounded-full px-4 py-1 text-slate-200 hover:text-white bg-slate-600 hover:bg-purple-400/60 transition ease-in-out duration-150 hover:scale-105 font-semibold"
                            onClick={ () => setOpenParams(true) }
                        >
                            Parameters
                        </button>
                    </div>

                </div>

                <ContestSubTitle subtitle="Approve"/>
                <ContestApproveAsset contractAddress={ contractAddress! } />

                <ContestSubTitle subtitle="Deposit assets"/>
                <ContestDepositAsset contractAddress={ contractAddress! } />

                <ContestSubTitle subtitle="Withdraw assets"/>
                <ContestWithdrawAsset contractAddress={ contractAddress! } />

                <Modal isOpen={ openParams } closeModal={ () => setOpenParams(false) }>

                    <div className="px-6 py-6 flex flex-col gap-4">
                        
                        <ContestSubTitle subtitle="Parameters"/>
                        <ContestParameters contractAddress={ contractAddress! } />

                        <ContestSubTitle subtitle="Preview"/>
                        <ContestItemsWarpper>                
                            <ContestUserPreviewDeposit address={ contractAddress }/>
                            <ContestUserPreviewWithdraw address={ contractAddress }/>
                        </ContestItemsWarpper>

                        <ContestSubTitle subtitle="Converters"/>
                            <ContestItemsWarpper>
                            <ContestUserConvertToAssets address={ contractAddress }/>
                            <ContestUserConvertToShares address={ contractAddress }/>
                        </ContestItemsWarpper>

                    </div>

                </Modal>
                
            </div>

            
        </Page>
    );


}
