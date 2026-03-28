import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
//import { LandingHeader } from "@/components/headers/LandingHeader";
//import { LandingFooter } from "@/components/footers/LandingFooter";
import { cn } from "./lib/utils";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CityAnalysis",
  description: "CityAnalysis.ca is a one of a kind microeconomic analytics platform engineered by Daedulus Technologies. The Municipal Explorer allows you to browse, analyze and compare the inner workings of cities all over Canada for deeper insights that can improve your business plan, marketing campaign, research efforts, and most of all, fill your curiosity leaving you more knowledgable than before.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  {/**the ClassName="light" alters the bg colour of the whole page */}
  {/*The 'grainy' property makes the grainy aesthitic in the background.. check globals.css at the bottom for the full code.*/}
  return (
    <html lang="en" suppressHydrationWarning className="light">
      
      {/**grainy adds that effect in the background. */}
      
        <body
          className={ cn(
            " min-h-screen font-sans antialiased",
            geistSans.className
          )}
        >
          <>
          {children}
          </>
        </body>
      
      
    </html>
  );
}
