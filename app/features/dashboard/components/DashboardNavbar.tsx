"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { MaxWidthWrapper } from "@/app/components/globals/MaxWidthWrapper";
import { SearchBar } from "@/app/components/ui/searchbar";
import { UserMenu } from "./UserMenu";
import { buttonVariants } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";

interface NavbarProps {
  onSearchChange?: (value: string) => void
  searchQuery?: string

}


export function DashboardNavbar({onSearchChange, searchQuery}:NavbarProps) {
  
  
  return (
    <nav className=" sticky h-14 inset-x-o top-0 z-30 border-b bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper className="flex h-14 items-center gap-3 px-4">


        {/* Left: logo / brand */}
        
            {/* Logo shown only on small devices */}
            <Link href="/dashboard" className={cn(buttonVariants({variant:"ghost"}))}>
                <Image
                    src="/Logo2.svg"
                    alt="City Analysis"
                    width={58}
                    height={40}   
                    
                />
          </Link>


        {/* Center: search (grows, keeps bar in the middle) */}
        <div className="flex flex-1 justify-center">
          <SearchBar
            className="w-full max-w-lg"
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search municipalities..."
          />
          
        </div>

        {/* Right: single user menu */}
        <div className="flex items-center justify-end">
          <UserMenu />
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
