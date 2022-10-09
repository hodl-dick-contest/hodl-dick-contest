import { Page } from "../components/common/page";
import { ContestView } from "../components/contest/contestView";
import { useFactoryListChildren } from "../hooks/useFactoryListChildren";
import { useAccount } from "wagmi";
import { Fragment, useState } from "react";
import { Modal } from "../components/common/modal";
import { ContestFactory } from "../components/contest/contestFactory";


export const PageHome = () => {
    const { children } = useFactoryListChildren();
    const { isConnected } = useAccount();
    const [ openModal, setOpenModal ] = useState<boolean>(false);

    console.log(openModal);

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
                    <ContestFactory 
                        closeModal={() => setOpenModal(false) }
                    />
                </Modal>

            </Fragment>
        );
    } else {
        return (
            <Fragment>
                <Page>
                    <div className="w-full mt-16 flex flex-col justify-start items-start gap-12">
                        
                        <div className="text-transparent text-7xl bg-clip-text bg-gradient-to-r from-purple-600 to-purple-300 font-mono">
                            Connect wallet
                        </div>

                        <div className="text-6xl text-slate-100 font-mono">
                            to access the
                        </div>

                        <div className="flex flex-row text-7xl text-slate-100 gap-6 font-mono">
                            Holder <div className="animate-bounce hover:animate-spin"> 🍆 </div> <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-300">Contest</div>
                        </div>

                    </div>
                </Page>
            </Fragment>
        );
    }
}
