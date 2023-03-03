import React, { createContext, useState, useEffect } from "react";

interface CoinContextType {
  coinName: string | undefined; 
  setCoinName: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const CoinContext = createContext<CoinContextType>({
  coinName: undefined,
  setCoinName: () => {},
});

export const CoinProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [coinName, setCoinName] = useState<string | undefined>(
    localStorage.getItem("coinName") || undefined
  );

  useEffect(() => {
    if (coinName !== undefined) {
      localStorage.setItem("coinName", coinName);
    } else {
      localStorage.removeItem("coinName");
    }
  }, [coinName]);

  return (
    <CoinContext.Provider value={{ coinName, setCoinName }}>
      {children}
    </CoinContext.Provider>
  );
};