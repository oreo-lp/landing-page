import { Navbar } from "./elements/Navbar";
import { Footer } from "./elements/Footer";
import { useEffect } from "react";

interface LayoutProps {
    title: string;
    children: React.ReactNode;
}

export const Layout = ({ title, children }: LayoutProps) => {
    useEffect(() => {
        document.title = title
    }, [title]) // 更新title

    return (
        <div>
            <Navbar />
            <main className="flex flex-col gap-y-20 md:gap-y-32 overflow-hidden">
                {children}
            </main>
            <Footer />
        </div>
    )
}