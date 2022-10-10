import { ArrowPathIcon, CheckCircleIcon, ExclamationCircleIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";


interface PropsShowIcon {
    isError?: boolean;
    isWaiting?: boolean; 
    isSuccess?: boolean;
}

export const ShowIcon = (props: PropsShowIcon) => {
    if ( props.isError ) {        
        return <ExclamationCircleIcon className="w-5 h-5 m-1 animate-bounce"/>;
    } else if ( props.isWaiting ) {
        return <ArrowPathIcon className="w-5 h-5 m-1 animate-spin"/>;
    } else if ( props.isSuccess ) {
        return <CheckCircleIcon className="w-5 h-5 m-1"/>;
    } else {        
        return <PaperAirplaneIcon className="w-5 h-5 m-1"/>;
    }
}
