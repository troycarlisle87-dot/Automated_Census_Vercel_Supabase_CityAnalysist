"use client";
import { createContext, useContext, useState } from "react";

type DataContextType = {
  data: number
  userId: string 
  setData: (newData: number) => void
  setUserId: (newUser: string) => void
};

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState(0); // empty if 0
  const [userId, setUserId] = useState("");
  

  return (
    <DataContext.Provider value={{ data, userId, setUserId ,setData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);

  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }

  return context;
}