
import { ConnectButton } from "@rainbow-me/rainbowkit";


export const WalletButton = () => {

    return (
      <ConnectButton.Custom>
        {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === 'authenticated');
  
          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button 
                        className="
                        h-9
                        px-3
                        flex flex-row items-center justify-start
                        rounded-lg
                        text-sm
                        font-semibold
                        text-stone-200 hover:text-white
                        bg-slate-800 hover:bg-purple-400/60
                        transition ease-in-out duration-100 hover:scale-110
                        "
                      onClick={ openConnectModal } 
                      type="button" 
                    >
                      Connect Wallet
                    </button>
                  );
                }
  
                if (chain.unsupported) {
                  return (
                    <button 
                      className="
                      h-9
                      px-3
                      flex flex-row items-center justify-start
                      rounded-lg
                      text-sm
                      font-semibold
                      text-stone-200 hover:text-white
                      bg-slate-800 hover:bg-purple-400/60
                      transition ease-in-out duration-100 hover:scale-110
                      "
                      onClick={ openChainModal }
                    >
                      Wrong network
                    </button>                
                  );
                }
  
                return (
                  <div className="flex flex-row items-center justify-start gap-4">
                    
                    <button
                        className="
                        h-9
                        px-3
                        flex flex-row items-center justify-start gap-2
                        rounded-lg
                        text-sm
                        font-light
                        text-stone-200 hover:text-white
                        bg-slate-800 hover:bg-purple-400/60
                        transition ease-in-out duration-100 hover:scale-[1.025]
                        "
                        onClick={ openChainModal }
                        type="button"
                    >
                      { chain.hasIcon && (
                        <div>
                            {chain.iconUrl && (
                                <img
                                    alt={ chain.name ?? 'Chain icon' }
                                    src={ chain.iconUrl }
                                style={{ width: 16, height: 16 }}
                                />
                            )}
                        </div>
                      )}
                      <div className="hidden md:flex">
                        { chain.name }
                      </div>
                    </button>
  
                    <button
                        className="
                        h-9
                        px-3
                        flex flex-row items-center justify-start
                        rounded-lg
                        text-sm
                        font-light
                        text-stone-200 hover:text-white
                        bg-slate-800 hover:bg-purple-400/60
                        transition ease-in-out duration-100 hover:scale-[1.02]
                        "
                        onClick={ openAccountModal }
                        type="button"
                    >
                      <div className="flex flex-row items-center justify-start gap-2">
                        <div className="hidden md:flex">
                          { account.displayBalance ? `${account.displayBalance}` : ''}
                        </div>
                        <div className="bg-slate-700 rounded-lg px-2">
                          { account.displayName }
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    );
};
