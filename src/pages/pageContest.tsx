import { useParams, useNavigate } from "react-router-dom";
import { Page } from "../components/common/page";
import { ContestDepositAsset } from "../components/contest/contestDepositAsset";
import { ContestItemsWarpper } from "../components/contest/contestItemsWrapper";
import { ContestParameters } from "../components/contest/contestParameters";
import { ContestSubTitle, ContestTitle } from "../components/contest/contestTitle";
import { ContestRedeemShares } from "../components/contest/contestRedeemShares";
import { ContestUserConvertToAssets, ContestUserConvertToShares } from "../components/contest/contestUserConverters";
import { ContestUserPreviewDeposit, ContestUserPreviewWithdraw } from "../components/contest/contestUserPreviews";
import { useAccount } from "wagmi";
import { Tab } from "@headlessui/react";
import { TabTitle } from "../components/common/tabTitle";
import { TabPanel } from "../components/common/tabPanel";


export const PageContest = () => {
    
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

                    <div className="min-w-fit font-light">
                        <ContestTitle contractAddress={ contractAddress! }/>
                    </div>

                    <div className="w-full flex flex-row justify-end items-center gap-4">
                        <button 
                            className="
                                px-4 py-1 
                                bg-slate-600 hover:bg-purple-400/60 
                                text-slate-200 hover:text-white 
                                font-light hover:font-normal
                                rounded-full
                                text-sm
                                transition ease-in-out duration-150 hover:scale-[1.02] 
                                "
                            onClick={ () => navigate("/")}
                        >
                            Back to contests
                        </button>
                    </div>

                </div>

                <Tab.Group>

                    <Tab.List className="pt-2 w-full flex flex-row justify-start items-center gap-4">                    
                        <TabTitle> Deposit </TabTitle>
                        <TabTitle> Redeem </TabTitle>
                        <TabTitle> Parameters </TabTitle>
                    </Tab.List>

                    <Tab.Panels className="w-full flex">

                        <TabPanel> 
                            <ContestDepositAsset contractAddress={ contractAddress! } />
                        </TabPanel>

                        <TabPanel>
                            <ContestRedeemShares contractAddress={ contractAddress! } />
                        </TabPanel>

                        <TabPanel>
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
                        </TabPanel>

                    </Tab.Panels>

                </Tab.Group>
                
            </div>
            
        </Page>
    );


}
