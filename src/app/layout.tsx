import type { Metadata } from "next";
import { Inter, Montserrat, Syne } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";

const fontInter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const fontMontserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
});

const fontSyne = Syne({
    subsets: ["latin"],
    weight: ["700"],
    variable: "--font-syne",
});

export const metadata: Metadata = {
    title: "Axelr8",
    description: "Accelerating your product security maturity",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={
                    (cn("min-h-screen bg-background font-inter antialiased"),
                    fontInter.variable,
                    fontMontserrat.variable,
                    fontSyne.variable)
                }
            >
                {children}
            </body>
        </html>
    );
}
