import { Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react';


interface PropsToolTip {    
    children: React.ReactNode;
    isOpen: boolean;
    closeModal: () => void;
}


export const Modal: React.FC<PropsToolTip> = (props: PropsToolTip) => {
    return (
        <Transition appear show={ props.isOpen } as={ Fragment }>

            <Dialog as="div" className="relative z-10" onClose={ props.closeModal }>

                <Transition.Child
                    as={ Fragment }
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-slate-900" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className="                              
                                    transform
                                    overflow-hidden
                                    rounded-xl
                                    bg-slate-800
                                    bg-opacity-60
                                    text-left
                                    align-middle
                                    shadow-xl
                                    transition-all
                                    "
                            >
                                { props.children }
                            </Dialog.Panel>                        
                        </Transition.Child>
                    </div>
                </div>

            </Dialog>

        </Transition>
    );
}
