import React from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import { HorizontalLine } from "./horizontalLine";

interface PageProps {
    children: React.ReactChild; 
}

export const Page: React.FC<PageProps>  = ({ children }) =>  {    
    return (
        <div className="min-h-screen flex flex-col">

            <header className="min-w-full bg-slate-900 py-8 ">
                <div className="mx-auto">
                    <div className="px-8 pb-8">
                        <Header/>
                    </div>
                </div>
                <HorizontalLine />
            </header>

            <main className="min-w-full flex-grow bg-slate-900">
                <div className="px-8 mx-auto max-w-screen-sm md:max-w-screen-md">                    
                    { children }
                </div>
            </main>

            <footer className="min-w-full py-8 bg-slate-900">
                <HorizontalLine />
                <div className="px-8 mx-auto max-w-screen-sm md:max-w-screen-md">                    
                    <div className="pt-8">
                        <Footer/>
                    </div>
                </div>
            </footer>

        </div>
    );
}
