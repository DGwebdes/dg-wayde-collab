import React from "react";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";

const Layout = ({ children }) => {
    return (
        <div className="w-full h-screen flex flex-col justify-between">
            <nav className="px-10 py-4 bg-zinc-950 text-slate-100">
                <Navbar />
            </nav>
            <main className="bg-zinc-950 text-slate-100 flex-1 px-4 md:px-10 py-4">
                {children}
            </main>
            <footer>{/* <Footer /> */}</footer>
        </div>
    );
};

export default Layout;
