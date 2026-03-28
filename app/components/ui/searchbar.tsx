"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export function SearchBar({
  placeholder = "Search municipalities, KPIs, or reports...",
  value,
  onChange,
  className,
}: SearchBarProps) {
  const [internalValue, setInternalValue] = React.useState("");

  const currentValue = value ?? internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    if (onChange) {
      onChange(next);
    } else {
      setInternalValue(next);
    }
  };

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
        <Search className="h-4 w-4" aria-hidden="true" />
      </span>
      <Input
        type="search"
        role="searchbox"
        aria-label="Search dashboard"
        className="pl-9"
        placeholder={placeholder}
        value={currentValue}
        onChange={handleChange}
      />
    </div>
     );
}