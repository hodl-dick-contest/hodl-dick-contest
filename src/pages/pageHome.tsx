import { Page } from "../components/common/page";
import { ContestView } from "../components/contest/contestView";
import { useFactoryListChildren } from "../hooks/useFactoryListChildren";
import { useAccount } from "wagmi";
import { Fragment, useState } from "react";
import { Modal } from "../components/common/modal";
import { FactoryModal } from "../components/factory/factoryModal";
import { PageNotConntected } from "./pageNotConnected";


export const PageHome = () => {
    const { children } = useFactoryListChildren();
    const { isConnected } = useAccount();
    const [ openModal, setOpenModal ] = useState<boolean>(false);
    if (isConnected) {
        return (
            <Fragment>
                <Page>
                    <div className="w-full flex flex-col justify-start items-start gap-4">
                        <div className="w-full flex flex-row justify-between items-center">
                            <div className="text-2xl text-slate-100">
                                Contests
                            </div>
                            <button 
                                className="rounded-full px-4 py-1 font-semibold text-slate-200 hover:text-white bg-slate-600 hover:bg-purple-400/60 transition ease-in-out duration-150 hover:scale-105"
                                onClick={ () => setOpenModal(true) }
                            >
                                Add contract
                            </button>
                        </div>
                        <div className="w-full flex flex-col justify-start items-start">
                            { 
                                (!children) ? null :
                                children.map((item, key) => <ContestView address={ item } key={ key }/>)
                            }
                        </div>
                    </div>
                </Page>

                <Modal isOpen={ openModal } closeModal={ () => setOpenModal(false) }>                    
                    <FactoryModal 
                        closeModal={() => setOpenModal(false) }
                    />
                </Modal>

            </Fragment>
        );
    } else {
        return (
            <PageNotConntected/>
        );
    }
}
