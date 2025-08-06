'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
export const SideBarContext = createContext({
  collapsed: false,
  setCollapsed: (collapsed: boolean) => {},
});
export const SideBarProvider = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <SideBarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SideBarContext.Provider>
  );
};

export const useSideBarProvider = () => {

  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error('useSideBar must be used within a SideBarProvider');
  }
  return context;
};

